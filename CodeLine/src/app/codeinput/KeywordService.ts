import { Injectable } from '@angular/core';
import { TempModel } from './scroll/code/line/tempCode';

@Injectable()
export class KeywordService extends TempModel {
    constructor() { super(); }

    private chars: string[] = [];

    /**
     * 计算字符关键字位置调用相应的函数
     */
    public AIPlay(str: string): string {
        this.chars = str.split(' '); // 分割单词
        for (var index = 0; index < this.chars.length; index++) {
            var element = this.chars[index];
            let i = super.KeyList().indexOf(element);
            this.chars[index] = this.KeyFunction(i, element); // 替换关键字
        }
        return this.chars.join(' ');
    }

    /**
     * 关键字方法
     * i:关键字索引
     * str:替换文本
     */
    public KeyFunction(i: number, str: string): string {
        if (i >= 0) {
            let value = super.KeyList()[i];
            switch (value) {
                case 'class':
                    str = super.ModelKeyword(str);
                    break;

                default:
                    break;
            }
        }
        return str;
    }
}