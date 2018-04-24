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
        this.chars = this.GetStringtoArr(str); // 分割单词
        this.index = 0; // 初始化
        this.mode = new KeywordMode(this.chars);
        let keylist = super.KeyList(); // 关键字集合          
        
        while (this.index < this.chars.length) {
            let i = super.KeyList()[this.chars[this.index]]; // 获取关键字类型
            if (i == null){
                this.ValueNameFunction();
            }
            else if(i < keylist.if && i > -1){
                this.KeyFunction(i);
            }
            else if(i >= keylist.if && i < keylist.return){
                this.OperatorFunction();
            }
            else if(i == keylist.return){
                this.KeyFunction(i);
            }
        }

        return this.chars.join(' ');
    }

    /**
     * 返回一个单词的数组
     */
    private GetStringtoArr(str:string):string[]{
        let p = [];
        if (str != null){
            let arr = str.split(' ');
            for (var index = 0; index < arr.length; index++) {
                var element = arr[index];
                if(element != ""){
                    p.push(element);
                }
            }
        }
        return p;
    }

    /**
     * 正则匹配
     * str：单词
     * return：返回关键字索引
     */
    private Findkey(str:string):void{
        var reg = /(class)\s(\w+)/;
        var value1 = str.replace(reg,'$1');
        var value2 = str.replace(reg,'$2');
        console.log('正则1：' + (str == value1?'':value1));
        console.log('正则2：' + (str == value2?'':value2));        
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

    /**
     * 操作符方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private OperatorFunction(): KeywordService {
        let obj: KeywordMode = this.mode; // 处理过后的模型
        if (obj.length > 0) {
            let value = obj.GetValue(0); // 处理第一位数组
            this.chars[this.index] = super.ModelOperator(value);
            this.index++;
        }

        this.mode.SetArr(this.chars.slice(this.index)); // 处理下一个单词
        return this;
    }
}