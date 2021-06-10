/******
 * 
 * @method 创建emoji表情
 * 
 * *******/
class CreateEmoji {
    private emojiList:any = { "<笑脸>": "1f604", "<开心>": "1f60a", "<大笑>": "1f603", "<眨眼>": "1f609", "<色>": "1f60d", "<接吻>": "1f618", "<亲吻>": "1f61a", "<脸红>": "1f633", "<露齿笑>": "1f63c", "<满意>": "1f60c", "<戏弄>": "1f61c", "<吐舌>": "1f445", "<无语>": "1f612", "<得意>": "1f60f", "<汗>": "1f613", "<失望>": "1f640", "<低落>": "1f61e", "<呸>": "1f616", "<焦虑>": "1f625", "<担心>": "1f630", "<震惊>": "1f628", "<悔恨>": "1f62b", "<眼泪>": "1f622", "<哭>": "1f62d", "<破涕为笑>": "1f602", "<晕>": "1f632", "<恐惧>": "1f631", "<心烦>": "1f620", "<生气>": "1f63e", "<睡觉>": "1f62a", "<生病>": "1f637", "<恶魔>": "1f47f", "<外星人>": "1f47d", "<心>": "2764", "<心碎>": "1f494", "<丘比特>": "1f498", "<闪烁>": "2728", "<星星>": "1f31f", "<睡着>": "1f4a4", "<水滴>": "1f4a6", "<音乐>": "1f3b5", "<火>": "1f525", "<便便>": "1f4a9", "<强>": "1f44d", "<弱>": "1f44e", "<拳头>": "1f44a", "<胜利>": "270c", "<上>": "1f446", "<下>": "1f447", "<右>": "1f449", "<左>": "1f448", "<第一>": "261d", "<强壮>": "1f4aa", "<吻>": "1f48f", "<热恋>": "1f491", "<男孩>": "1f466", "<女孩>": "1f467", "<女士>": "1f469", "<男士>": "1f468", "<天使>": "1f47c", "<骷髅>": "1f480", "<红唇>": "1f48b", "<太阳>": "2600", "<下雨>": "2614", "<多云>": "2601", "<雪人>": "26c4", "<月亮>": "1f319", "<闪电>": "26a1", "<海浪>": "1f30a", "<猫>": "1f431", "<小狗>": "1f429", "<老鼠>": "1f42d", "<仓鼠>": "1f439", "<兔子>": "1f430", "<狗>": "1f43a", "<青蛙>": "1f438", "<老虎>": "1f42f", "<考拉>": "1f428", "<熊>": "1f43b", "<猪>": "1f437", "<牛>": "1f42e", "<野猪>": "1f417", "<猴子>": "1f435", "<马>": "1f434", "<蛇>": "1f40d", "<鸽子>": "1f426", "<鸡>": "1f414", "<企鹅>": "1f427", "<毛虫>": "1f41b", "<章鱼>": "1f419", "<鱼>": "1f420", "<鲸鱼>": "1f433", "<海豚>": "1f42c", "<玫瑰>": "1f339", "<花>": "1f33a", "<棕榈树>": "1f334", "<仙人掌>": "1f335", "<礼盒>": "1f49d", "<南瓜灯>": "1f383", "<鬼魂>": "1f47b", "<圣诞老人>": "1f385", "<圣诞树>": "1f384", "<礼物>": "1f381", "<铃>": "1f514", "<庆祝>": "1f389", "<气球>": "1f388", "<CD>": "1f4bf", "<相机>": "1f4f7", "<录像机>": "1f3a5", "<电脑>": "1f4bb", "<电视>": "1f4fa", "<电话>": "1f4de", "<解锁>": "1f513", "<锁>": "1f512", "<钥匙>": "1f511", "<成交>": "1f528", "<灯泡>": "1f4a1", "<邮箱>": "1f4eb", "<浴缸>": "1f6c0", "<钱>": "1f4b2", "<炸弹>": "1f4a3", "<手枪>": "1f52b", "<药丸>": "1f48a", "<橄榄球>": "1f3c8", "<篮球>": "1f3c0", "<足球>": "26bd", "<棒球>": "26be", "<高尔夫>": "26f3", "<奖杯>": "1f3c6", "<入侵者>": "1f47e", "<唱歌>": "1f3a4", "<吉他>": "1f3b8", "<比基尼>": "1f459", "<皇冠>": "1f451", "<雨伞>": "1f302", "<手提包>": "1f45c", "<口红>": "1f484", "<戒指>": "1f48d", "<钻石>": "1f48e", "<咖啡>": "2615", "<啤酒>": "1f37a", "<干杯>": "1f37b", "<鸡尾酒>": "1f377", "<汉堡>": "1f354", "<薯条>": "1f35f", "<意面>": "1f35d", "<寿司>": "1f363", "<面条>": "1f35c", "<煎蛋>": "1f373", "<冰激凌>": "1f366", "<蛋糕>": "1f382", "<苹果>": "1f34f", "<飞机>": "2708", "<火箭>": "1f680", "<自行车>": "1f6b2", "<高铁>": "1f684", "<警告>": "26a0", "<旗>": "1f3c1", "<男人>": "1f6b9", "<女人>": "1f6ba", "<X>": "274e", "<O>": "2b55", "<商标>": "2122", "<叹号>": "2755", "<问号>": "2754" };

    private toUnicode(code:string){
        let codes = code.split('-').map((value:string)=> parseInt(value, 16));
        return String.fromCodePoint.apply(null, codes);
    }

    private htmlEncode(code:string) {
        return code && code.replace ? code.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;") : code;
    }

    private afterEncodeEmoji(str:string) {
        let self:CreateEmoji = this;
        var unicodeStr = str.replace(/<.*?>/g, function (a) {
            if (self.emojiList[a]) {
                return self.toUnicode(self.emojiList[a]);
            } else {
                return a;
            }
        });
        return this.htmlEncode(unicodeStr);
    }
    private fromCodePoint(){
        if (!String.fromCodePoint) {
            String.fromCodePoint = function fromCodePoint() {
                var chars = [], point, offset, units, i;
                for (i = 0; i < arguments.length; ++i) {
                    point = arguments[i];
                    offset = point - 0x10000;
                    units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
                    chars.push(String.fromCharCode.apply(null, units));
                }
                return chars.join("");
            }
        }
    }
    //设置
    public set emoji(value:any){
        this.emojiList = value;
    }
    //获取
    public get emoji(){
      return this.emojiList;
    }
    public initEmoji(){
        this.fromCodePoint();
        let emojiArr = [];
        for(let key in this.emojiList){
            emojiArr.push({
                name:key,
                value:this.afterEncodeEmoji(key)
            })
        }
        return emojiArr;
    }
    
}

export default CreateEmoji;