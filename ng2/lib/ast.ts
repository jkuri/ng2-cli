import * as ts from 'typescript';
import * as fs from 'fs';

interface Change {
  apply(): Promise<any>;
  path: string;
  order: number;
  description: string;
}

export class Ast {
  source: ts.SourceFile;

  constructor(private filePath: string) {
    this.source = this._getSource(this.filePath);
  }

  findNodesByText(node: ts.Node, text: string): ts.Node[] {
    if (!node) {
      return [];
    }
    let arr: ts.Node[] = [];
    if (node.getText() === text) {
      arr.push(node);
    }

    return node.getChildren().reduce((foundNodes, child) => {
      return foundNodes.concat(this.findNodesByText(child, text));
    }, arr);
  }

  insertComponent(classifiedName: string, importPath: string): Promise<any> {
    let importNode: ts.Node = 
      this.findNodesByText(this.source, 'import').pop();
    let iPos: ts.LineAndCharacter =
      this.source.getLineAndCharacterOfPosition(importNode.getEnd());
    let iLine: number = iPos.line + 1;
    let iStart: number = this.source.getPositionOfLineAndCharacter(iLine, 0);
    let iStr: string = `import { ${classifiedName} } from ${importPath}\n`;
    let changeImport: InsertChange = new InsertChange(this.filePath, iStart, iStr);

    return changeImport.apply().then(() => {
      this.source = this._getSource(this.filePath);
      let declarationsNode: ts.Node = 
        this.findNodesByText(this.source, 'declarations').shift();
      let dPos: ts.LineAndCharacter = 
        this.source.getLineAndCharacterOfPosition(declarationsNode.getEnd());
      let dStart: number = 
        this.source.getPositionOfLineAndCharacter(dPos.line + 1, -1);
      let dStr: string = `\n    ${classifiedName},`;
      let changeDeclarations: InsertChange = new InsertChange(this.filePath, dStart, dStr);

      return changeDeclarations.apply();
    });
  }

  private _getSource(filePath: string): ts.SourceFile {
    return ts.createSourceFile(filePath, 
          fs.readFileSync(filePath).toString(),
          ts.ScriptTarget.ES6, true);
  }
}

export class InsertChange implements Change {
  order: number;
  description: string;

  constructor(
    public path: string,
    private pos: number,
    private toAdd: string
  ) {
    if (pos < 0) {
      throw new Error('Negative positions are not allowed.');
    }

    try {
      let stats: fs.Stats = fs.statSync(this.path);
      if (!stats.isFile()) {
        throw new Error(`${this.path} is not a file.`);
      }
    } catch (e) {
      throw new Error(`${this.path} does not exists.`);
    }

    this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
    this.order = pos;
  }

  apply(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (error, content: string) => {
        if (error) {
          throw new Error(error);
        }

        let prefix: string = content.substring(0, this.pos);
        let suffix: string = content.substring(this.pos);

        fs.writeFile(this.path, `${prefix}${this.toAdd}${suffix}`, (err) => {
          if (err) {
            throw new Error(err);
          } else {
            resolve();
          }
        });
      });
    });
  }
}
