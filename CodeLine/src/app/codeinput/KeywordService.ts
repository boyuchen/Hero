import { Injectable } from '@angular/core';
import { TempModel, KeywordMode } from './scroll/code/line/tempCode';

@Injectable()
export class KeywordService extends TempModel {
    constructor() { super(); }

    private chars: string[] = []; // 字符串数组
    private index: number = 0; // 当前处理到的索引
    private mode: KeywordMode; // 数据模型

    /**
     * 计算字符关键字位置调用相应的函数
     */
    public AIPlay(str: string): string {
        this.chars = str.split(' '); // 分割单词
        this.mode = new KeywordMode(this.chars);
        let i = super.KeyList().indexOf(this.chars[this.index]); // 获取关键字类型
        if(i < 11){
            this.KeyFunction(i).ValueNameFunction();
        }
        else if(i == 16){ //return 关键字处理
            this.KeyFunction(i).KeyFunction().ValueNameFunction();
        }

        return this.chars.join(' ');
    }

    /**
     * 关键字方法
     * obj：数据模型
     * i:第一个关键字索引
     * return：从模型数据中第二位数组的模型数据
     */
    private KeyFunction(i?:any): KeywordService {
        let obj: KeywordMode = this.mode; // 处理过后的模型
        if (obj.length > 0) {
            let value = obj.GetValue(0); //处理第一位数组
            if(i == null){ // 空值
                i = super.KeyList().indexOf(this.chars[this.index]); // 获取关键字类型
            }
            if(i < 11 && i > -1){
                this.chars[this.index] = super.ModelKeyword(value);
                this.index++;
            }
            else if(i >=11){
                this.chars[this.index] = super.ModelOperator(value);
                this.index++;
            }          
        }
        this.mode.SetArr(this.chars.slice(this.index)); // 处理下一个单词
        return this;
    }

    /**
     * 值方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private ValueNameFunction(): KeywordService {
        let obj: KeywordMode = this.mode; // 处理过后的模型
        if (obj.length > 0) {
            let value = obj.GetValue(0); // 处理第一位数组
            this.chars[this.index] = super.ModelString(value);
            this.index++;
        }

        this.mode.SetArr(this.chars.slice(this.index)); // 处理下一个单词
        return this;
    }
}