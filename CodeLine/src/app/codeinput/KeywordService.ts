import { Injectable } from '@angular/core';
import { TempModel, KeywordMode } from './scroll/code/line/tempCode';
import { ContactService } from './ContactService';

@Injectable()
export class KeywordService extends TempModel {
    constructor(private _contactservice: ContactService) {
        super();
        // 引用本地json文件
        this._contactservice.getContactsData().subscribe(data => this.data = data);
    }

    private data: {}; // 本地json数据
    private chars: string[] = []; // 字符串数组
    private index: number = 0; // 当前处理到的索引
    private mode: KeywordMode; // 数据模型
    /**
     * 计算字符关键字位置调用相应的函数
     */
    public AIPlay(str: string) {
        this.chars = this.GetStringtoArr(str); // 分割单词
        this.index = 0; // 初始化
        //this.mode = new KeywordMode(this.chars);   

        while (this.index < this.chars.length) {
            this.KeyFunction(this.data, str);
        }

        return this.chars.join(" ");
    }

    /**
     * 返回一个单词的数组
     */
    private GetStringtoArr(str: string): string[] {
        let p = [];
        if (str != null) {
            let arr = str.split(' ');
            for (var index = 0; index < arr.length; index++) {
                var element = arr[index];
                if (element != "") {
                    p.push(element);
                }
            }
        }
        return p;
    }

    /**
     * 关键字方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private KeyFunction(data: any, str: string): void {
        let key = this.chars[this.index]; // 当前在处理的单词
        let keylist = super.KeyList(); // 关键字集合 
        let obj = data[key];
        // 获取正则表达式
        if (obj && obj.reg) {
            let reg: RegExp = new RegExp(obj.reg); // 加载正则表达式
            // 遍历正则捕获的字符串
            for (var index = 1; index <= obj.type.length; index++) {
                var value = ""; // 需要替换的字符串
                let match = str.match(reg);
                var v = match[index]; // 捕获到的字符串
                var i = this.chars.indexOf(v); // 捕获字符串在字典中的位置
                let x = super.KeyList()[obj.type[index-1]]; // 捕获字符串的类型
                if (x == null) {
                    value = super.ModelString(v); // 替换为普通字符串
                }
                else if (x < keylist.if && x > -1) {
                    value = super.ModelKeyword(v); // 替换为关键字
                }
                else if (x >= keylist.if && x < keylist.return) {
                    // 替换为操作符
                }
                this.chars[i] = value; // 替换字典中的单词
                this.index++; // 准备替换下一个字典中的单词
            }
        }
        else
            this.index++;
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