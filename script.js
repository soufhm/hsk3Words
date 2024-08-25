const wordList = document.getElementById("word-list");
const timerElement = document.getElementById('timer');
const minutesInput = document.getElementById('minutes');
const startButton = document.getElementById('startTimer');
const timeoutSound = document.getElementById('timeoutSound');
const showPinyinButton = document.getElementById('showPinyin');
const shuffleButton = document.getElementById('shuffleButton'); 

let startTime; 
let timerInterval; 

// HSK 3 Vocabulary (update with your words)
const hsk3Words = [
  { "word": "万", "pinyin": "wàn", "translation": "ten thousand", "audio": "audio/wan1.mp3" },
  { "word": "东", "pinyin": "dōng", "translation": "east", "audio": "audio/dong1.mp3" },
  { "word": "为", "pinyin": "wèi", "translation": "for, to be", "audio": "audio/wei.mp3" },
  { "word": "久", "pinyin": "jiǔ", "translation": "long, long time", "audio": "audio/jiu.mp3" },
  { "word": "伞", "pinyin": "sǎn", "translation": "umbrella", "audio": "audio/san.mp3" },
  { "word": "位", "pinyin": "wèi", "translation": "position, place", "audio": "audio/wei2.mp3" },
  { "word": "借", "pinyin": "jiè", "translation": "borrow", "audio": "audio/jie.mp3" },
  { "word": "像", "pinyin": "xiàng", "translation": "like, resemble", "audio": "audio/xiang.mp3" },
  { "word": "元", "pinyin": "yuán", "translation": "yuan (currency)", "audio": "audio/yuan.mp3" },
  { "word": "先", "pinyin": "xiān", "translation": "first, before", "audio": "audio/xian.mp3" },
  { "word": "关", "pinyin": "guān", "translation": "close, concern", "audio": "audio/guan.mp3" },
  { "word": "分", "pinyin": "fēn", "translation": "minute, divide", "audio": "audio/fen.mp3" },
  { "word": "刻", "pinyin": "kè", "translation": "quarter of an hour", "audio": "audio/ke.mp3" },
  { "word": "包", "pinyin": "bāo", "translation": "wrap, package", "audio": "audio/bao1.mp3" },
  { "word": "半", "pinyin": "bàn", "translation": "half", "audio": "audio/ban1.mp3" },
  { "word": "又", "pinyin": "yòu", "translation": "again, also", "audio": "audio/you.mp3" },
  { "word": "双", "pinyin": "shuāng", "translation": "pair, double", "audio": "audio/shuang.mp3" },
  { "word": "发", "pinyin": "fā", "translation": "send, hair", "audio": "audio/fa.mp3" },
  { "word": "口", "pinyin": "kǒu", "translation": "mouth", "audio": "audio/kou.mp3" },
  { "word": "只", "pinyin": "zhī", "translation": "only, just", "audio": "audio/zhi.mp3" },
  { "word": "只", "pinyin": "zhī", "translation": "only, just", "audio": "audio/zhi2.mp3" },
  { "word": "向", "pinyin": "xiàng", "translation": "towards, to", "audio": "audio/xiang2.mp3" },
  { "word": "哭", "pinyin": "kū", "translation": "cry", "audio": "audio/ku.mp3" },
  { "word": "啊", "pinyin": "a", "translation": "ah, oh", "audio": "audio/a.mp3" },
  { "word": "嘴", "pinyin": "zuǐ", "translation": "mouth", "audio": "audio/zui.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "地", "pinyin": "dì", "translation": "ground, earth", "audio": "audio/di.mp3" },
  { "word": "坏", "pinyin": "huài", "translation": "bad, broken", "audio": "audio/huai.mp3" },
  { "word": "层", "pinyin": "céng", "translation": "layer, floor", "audio": "audio/ceng.mp3" },
  { "word": "差", "pinyin": "chà", "translation": "bad, difference", "audio": "audio/cha.mp3" },
  { "word": "带", "pinyin": "dài", "translation": "bring, wear", "audio": "audio/dai.mp3" },
  { "word": "张", "pinyin": "zhāng", "translation": "piece, spread out", "audio": "audio/zhang.mp3" },
  { "word": "把", "pinyin": "bǎ", "translation": "hold, handle", "audio": "audio/ba2.mp3" },
  { "word": "拿", "pinyin": "ná", "translation": "take, hold", "audio": "audio/na.mp3" },
  { "word": "换", "pinyin": "huàn", "translation": "change, exchange", "audio": "audio/huan.mp3" },
  { "word": "接", "pinyin": "jiē", "translation": "connect, receive", "audio": "audio/jie3.mp3" },
  { "word": "搬", "pinyin": "bān", "translation": "move, carry", "audio": "audio/ban2.mp3" },
  { "word": "放", "pinyin": "fàng", "translation": "release, place", "audio": "audio/fang.mp3" },
  { "word": "教", "pinyin": "jiào", "translation": "teach, instruct", "audio": "audio/jiao1.mp3" },
  { "word": "旧", "pinyin": "jiù", "translation": "old, former", "audio": "audio/jiu3.mp3" },
  { "word": "更", "pinyin": "gèng", "translation": "more, even", "audio": "audio/geng.mp3" },
  { "word": "条", "pinyin": "tiáo", "translation": "strip, clause", "audio": "audio/tiao.mp3" },
  { "word": "树", "pinyin": "shù", "translation": "tree", "audio": "audio/shu.mp3" },
  { "word": "楼", "pinyin": "lóu", "translation": "building, floor", "audio": "audio/lou.mp3" },
  { "word": "段", "pinyin": "duàn", "translation": "section, paragraph", "audio": "audio/duan1.mp3" },
  { "word": "渴", "pinyin": "kě", "translation": "thirsty", "audio": "audio/ke2.mp3" },
  { "word": "灯", "pinyin": "dēng", "translation": "lamp, light", "audio": "audio/deng2.mp3" },
  { "word": "班", "pinyin": "bān", "translation": "class, shift", "audio": "audio/ban3.mp3" },
  { "word": "甜", "pinyin": "tián", "translation": "sweet", "audio": "audio/tian.mp3" },
  { "word": "用", "pinyin": "yòng", "translation": "use", "audio": "audio/yong.mp3" },
  { "word": "画", "pinyin": "huà", "translation": "draw, paint", "audio": "audio/hua.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "疼", "pinyin": "téng", "translation": "pain, ache", "audio": "audio/teng.mp3" },
  { "word": "瘦", "pinyin": "shòu", "translation": "thin, skinny", "audio": "audio/shou.mp3" },
  { "word": "短", "pinyin": "duǎn", "translation": "short", "audio": "audio/duan2.mp3" },
  { "word": "矮", "pinyin": "ǎi", "translation": "short, low", "audio": "audio/ai.mp3" },
  { "word": "碗", "pinyin": "wǎn", "translation": "bowl", "audio": "audio/wan2.mp3" },
  { "word": "种", "pinyin": "zhòng", "translation": "kind, plant", "audio": "audio/zhong.mp3" },
  { "word": "站", "pinyin": "zhàn", "translation": "stand", "audio": "audio/zhan.mp3" },
  { "word": "米", "pinyin": "mǐ", "translation": "rice", "audio": "audio/mi.mp3" },
  { "word": "绿", "pinyin": "lǜ", "translation": "green", "audio": "audio/lv.mp3" },
  { "word": "老", "pinyin": "lǎo", "translation": "old", "audio": "audio/lao.mp3" },
  { "word": "胖", "pinyin": "pàng", "translation": "fat, plump", "audio": "audio/pang.mp3" },
  { "word": "脚", "pinyin": "jiǎo", "translation": "foot", "audio": "audio/jiao2.mp3" },
  { "word": "脸", "pinyin": "liǎn", "translation": "face", "audio": "audio/lian.mp3" },
  { "word": "腿", "pinyin": "tuǐ", "translation": "leg", "audio": "audio/tui.mp3" },
  { "word": "船", "pinyin": "chuán", "translation": "boat, ship", "audio": "audio/chuan.mp3" },
  { "word": "花", "pinyin": "huā", "translation": "flower", "audio": "audio/hua1.mp3" },
  { "word": "花", "pinyin": "huā", "translation": "flower", "audio": "audio/hua2.mp3" },
  { "word": "草", "pinyin": "cǎo", "translation": "grass", "audio": "audio/cao.mp3" },
  { "word": "蓝", "pinyin": "lán", "translation": "blue", "audio": "audio/lan.mp3" },
  { "word": "被", "pinyin": "bèi", "translation": "be, quilt", "audio": "audio/bei.mp3" },
  { "word": "西", "pinyin": "xī", "translation": "west", "audio": "audio/xi.mp3" },
  { "word": "讲", "pinyin": "jiǎng", "translation": "speak, explain", "audio": "audio/jiang.mp3" },
  { "word": "试", "pinyin": "shì", "translation": "try, test", "audio": "audio/shi.mp3" },
  { "word": "越", "pinyin": "yuè", "translation": "cross, surpass", "audio": "audio/yue.mp3" },
  { "word": "跟", "pinyin": "gēn", "translation": "follow, with", "audio": "audio/gen.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "辆", "pinyin": "liàng", "translation": "vehicle", "audio": "audio/liang.mp3" },
  { "word": "过", "pinyin": "guò", "translation": "pass, done", "audio": "audio/guo.mp3" },
  { "word": "还", "pinyin": "hái", "translation": "still, also", "audio": "audio/hai.mp3" },
  { "word": "长", "pinyin": "cháng", "translation": "long", "audio": "audio/chang.mp3" },
  { "word": "难", "pinyin": "nán", "translation": "difficult, hard", "audio": "audio/nan1.mp3" },
  { "word": "饱", "pinyin": "bǎo", "translation": "full", "audio": "audio/bao2.mp3" },
  { "word": "饿", "pinyin": "è", "translation": "hungry", "audio": "audio/e.mp3" },
  { "word": "马", "pinyin": "mǎ", "translation": "horse", "audio": "audio/ma.mp3" },
  { "word": "骑", "pinyin": "qí", "translation": "ride", "audio": "audio/qi.mp3" },
  { "word": "鸟", "pinyin": "niǎo", "translation": "bird", "audio": "audio/niao.mp3" },
  { "word": "冬", "pinyin": "dōng", "translation": "winter", "audio": "audio/dong2.mp3" },
  { "word": "南", "pinyin": "nán", "translation": "south", "audio": "audio/nan2.mp3" },
  { "word": "夏", "pinyin": "xià", "translation": "summer", "audio": "audio/xia.mp3" },
  { "word": "春", "pinyin": "chūn", "translation": "spring", "audio": "audio/chun.mp3" },
  { "word": "极", "pinyin": "jí", "translation": "extreme, pole", "audio": "audio/ji.mp3" },
  { "word": "秋", "pinyin": "qiū", "translation": "autumn", "audio": "audio/qiu.mp3" },
  { "word": "角", "pinyin": "jiǎo", "translation": "corner, angle", "audio": "audio/jiao3.mp3" },
  { "word": "一共", "pinyin": "yī gòng", "translation": "altogether", "audio": "audio/yigong.mp3" },
  { "word": "一定", "pinyin": "yī dìng", "translation": "must, certainly", "audio": "audio/yiding.mp3" },
  { "word": "一样", "pinyin": "yī yàng", "translation": "same", "audio": "audio/yiyang.mp3" },
  { "word": "一直", "pinyin": "yī zhí", "translation": "always, straight", "audio": "audio/yizhi.mp3" },
  { "word": "一般", "pinyin": "yī bān", "translation": "general, ordinary", "audio": "audio/yiban.mp3" },
  { "word": "一边", "pinyin": "yī biān", "translation": "one side", "audio": "audio/yibian.mp3" },
  { "word": "上网", "pinyin": "shàng wǎng", "translation": "go online", "audio": "audio/shangwang.mp3" },
  { "word": "世界", "pinyin": "shì jiè", "translation": "world", "audio": "audio/shijie.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "个子", "pinyin": "gè zi", "translation": "stature, figure", "audio": "audio/gezi.mp3" },
  { "word": "中文", "pinyin": "zhōng wén", "translation": "Chinese language", "audio": "audio/zhongwen.mp3" },
  { "word": "中间", "pinyin": "zhōng jiān", "translation": "middle", "audio": "audio/zhongjian.mp3" },
  { "word": "为了", "pinyin": "wèi le", "translation": "for the sake of", "audio": "audio/weile.mp3" },
  { "word": "主要", "pinyin": "zhǔ yào", "translation": "main, mainly", "audio": "audio/zhuyao.mp3" },
  { "word": "习惯", "pinyin": "xí guàn", "translation": "habit", "audio": "audio/xiguan.mp3" },
  { "word": "了解", "pinyin": "liǎo jiě", "translation": "understand, know", "audio": "audio/liaojie.mp3" },
  { "word": "以前", "pinyin": "yǐ qián", "translation": "before, previously", "audio": "audio/yiqian.mp3" },
  { "word": "会议", "pinyin": "huì yì", "translation": "meeting", "audio": "audio/huiyi.mp3" },
  { "word": "体育", "pinyin": "tǐ yù", "translation": "physical education, sports", "audio": "audio/tiyu.mp3" },
  { "word": "作业", "pinyin": "zuò yè", "translation": "homework", "audio": "audio/zuoye.mp3" },
  { "word": "健康", "pinyin": "jiàn kāng", "translation": "health", "audio": "audio/jiankang.mp3" },
  { "word": "公园", "pinyin": "gōng yuán", "translation": "park", "audio": "audio/gongyuan.mp3" },
  { "word": "公斤", "pinyin": "gōng jīn", "translation": "Kilogram", "audio": "audio/gongjin.mp3" },
  { "word": "关于", "pinyin": "guān yú", "translation": "about, concerning", "audio": "audio/guanyu.mp3" },
  { "word": "关心", "pinyin": "guān xīn", "translation": "care about", "audio": "audio/guanxin.mp3" },
  { "word": "关系", "pinyin": "guān xì", "translation": "relationship", "audio": "audio/guanxi.mp3" },
  { "word": "其他", "pinyin": "qí tā", "translation": "other", "audio": "audio/qita.mp3" },
  { "word": "其实", "pinyin": "qí shí", "translation": "actually", "audio": "audio/qishi.mp3" },
  { "word": "最后", "pinyin": "zuì hòu", "translation": "finally", "audio": "audio/zuihou.mp3" },
  { "word": "最近", "pinyin": "zuì jìn", "translation": "recently", "audio": "audio/zuijin.mp3" },
  { "word": "冰箱", "pinyin": "bīng xiāng", "translation": "refrigerator", "audio": "audio/bingxiang.mp3" },
  { "word": "决定", "pinyin": "jué dìng", "translation": "decide", "audio": "audio/jueding.mp3" },
  { "word": "几乎", "pinyin": "jī hū", "translation": "almost", "audio": "audio/jihu.mp3" },
  { "word": "刚才", "pinyin": "gāng cái", "translation": "just now", "audio": "audio/gangcai.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "别人", "pinyin": "bié rén", "translation": "other people", "audio": "audio/bieren.mp3" },
  { "word": "刮风", "pinyin": "guā fēng", "translation": "wind blows", "audio": "audio/guafeng.mp3" },
  { "word": "刷牙", "pinyin": "shuā yá", "translation": "brush teeth", "audio": "audio/shuaya.mp3" },
  { "word": "办法", "pinyin": "bàn fǎ", "translation": "method, way", "audio": "audio/banfa.mp3" },
  { "word": "动物", "pinyin": "dòng wù", "translation": "animal", "audio": "audio/dongwu.mp3" },
  { "word": "努力", "pinyin": "nǔ lì", "translation": "effort", "audio": "audio/nuli.mp3" },
  { "word": "历史", "pinyin": "lì shǐ", "translation": "history", "audio": "audio/lishi.mp3" },
  { "word": "参加", "pinyin": "cān jiā", "translation": "participate, join", "audio": "audio/canjia.mp3" },
  { "word": "发烧", "pinyin": "fā shāo", "translation": "have a fever", "audio": "audio/fashao.mp3" },
  { "word": "发现", "pinyin": "fā xiàn", "translation": "discover, find", "audio": "audio/faxian.mp3" },
  { "word": "叔叔", "pinyin": "shū shu", "translation": "uncle", "audio": "audio/shushu.mp3" },
  { "word": "变化", "pinyin": "biàn huà", "translation": "change", "audio": "audio/bianhua.mp3" },
  { "word": "句子", "pinyin": "jù zi", "translation": "sentence", "audio": "audio/juzi.mp3" },
  { "word": "可爱", "pinyin": "kě ài", "translation": "cute, lovely", "audio": "audio/keai.mp3" },
  { "word": "司机", "pinyin": "sī jī", "translation": "driver", "audio": "audio/siji.mp3" },
  { "word": "同事", "pinyin": "tóng shì", "translation": "colleague", "audio": "audio/tongshi.mp3" },
  { "word": "同意", "pinyin": "tóng yì", "translation": "agree", "audio": "audio/tongyi.mp3" },
  { "word": "后来", "pinyin": "hòu lái", "translation": "later", "audio": "audio/houlai.mp3" },
  { "word": "周末", "pinyin": "zhōu mò", "translation": "weekend", "audio": "audio/zhoumo.mp3" },
  { "word": "啤酒", "pinyin": "pí jiǔ", "translation": "beer", "audio": "audio/pijiu.mp3" },
  { "word": "回答", "pinyin": "huí dá", "translation": "answer", "audio": "audio/huida.mp3" },
  { "word": "国家", "pinyin": "guó jiā", "translation": "country", "audio": "audio/guojia.mp3" },
  { "word": "地图", "pinyin": "dì tú", "translation": "map", "audio": "audio/ditu.mp3" },
  { "word": "地方", "pinyin": "dì fāng", "translation": "place", "audio": "audio/difang.mp3" },
  { "word": "地铁", "pinyin": "dì tiě", "translation": "subway", "audio": "audio/ditie.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "城市", "pinyin": "chéng shì", "translation": "city", "audio": "audio/chengshi.mp3" },
  { "word": "声音", "pinyin": "shēng yīn", "translation": "sound, voice", "audio": "audio/shengyin.mp3" },
  { "word": "复习", "pinyin": "fù xí", "translation": "review", "audio": "audio/fuxi.mp3" },
  { "word": "多么", "pinyin": "duō me", "translation": "how, so", "audio": "audio/duome.mp3" },
  { "word": "太阳", "pinyin": "tài yáng", "translation": "sun", "audio": "audio/taiyang.mp3" },
  { "word": "头发", "pinyin": "tóu fa", "translation": "hair", "audio": "audio/toufa.mp3" },
  { "word": "奇怪", "pinyin": "qí guài", "translation": "strange, weird", "audio": "audio/qiguai.mp3" },
  { "word": "奶奶", "pinyin": "nǎi nai", "translation": "grandmother", "audio": "audio/nainai.mp3" },
  { "word": "如果", "pinyin": "rú guǒ", "translation": "if", "audio": "audio/ruguo.mp3" },
  { "word": "季节", "pinyin": "jì jié", "translation": "season", "audio": "audio/jijie.mp3" },
  { "word": "安静", "pinyin": "ān jìng", "translation": "quiet, peaceful", "audio": "audio/anjing.mp3" },
  { "word": "完成", "pinyin": "wán chéng", "translation": "complete, finish", "audio": "audio/wancheng.mp3" },
  { "word": "客人", "pinyin": "kè rén", "translation": "guest", "audio": "audio/keren.mp3" },
  { "word": "害怕", "pinyin": "hài pà", "translation": "fear, be afraid", "audio": "audio/haipa.mp3" },
  { "word": "容易", "pinyin": "róng yì", "translation": "easy", "audio": "audio/rongyi.mp3" },
  { "word": "小心", "pinyin": "xiǎo xīn", "translation": "be careful", "audio": "audio/xiaoxin.mp3" },
  { "word": "帮忙", "pinyin": "bāng máng", "translation": "help", "audio": "audio/bangmang.mp3" },
  { "word": "帽子", "pinyin": "mào zi", "translation": "hat", "audio": "audio/maozi.mp3" },
  { "word": "干净", "pinyin": "gān jìng", "translation": "clean", "audio": "audio/ganjing.mp3" },
  { "word": "年级", "pinyin": "nián jí", "translation": "grade (school)", "audio": "audio/nianji.mp3" },
  { "word": "年轻", "pinyin": "nián qīng", "translation": "young", "audio": "audio/nianqing.mp3" },
  { "word": "应该", "pinyin": "yīng gāi", "translation": "should", "audio": "audio/yinggai.mp3" },
  { "word": "当然", "pinyin": "dāngrán", "translation": "of course", "audio": "audio/dangran.mp3" },
  { "word": "影响", "pinyin": "yǐng xiǎng", "translation": "influence", "audio": "audio/yingxiang.mp3" },
  { "word": "必须", "pinyin": "bì xū", "translation": "must", "audio": "audio/bixu.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "忘记", "pinyin": "wàng jì", "translation": "forget", "audio": "audio/wangji.mp3" },
  { "word": "总是", "pinyin": "zǒng shì", "translation": "always", "audio": "audio/zongshi.mp3" },
  { "word": "感冒", "pinyin": "gǎn mào", "translation": "catch a cold", "audio": "audio/ganmao.mp3" },
  { "word": "愿意", "pinyin": "yuàn yì", "translation": "be willing", "audio": "audio/yuanyi.mp3" },
  { "word": "成绩", "pinyin": "chéng jì", "translation": "achievement, grade", "audio": "audio/chengji.mp3" },
  { "word": "或者", "pinyin": "huò zhě", "translation": "or", "audio": "audio/huozhe.mp3" },
  { "word": "打扫", "pinyin": "dǎ sǎo", "translation": "clean", "audio": "audio/dasao.mp3" },
  { "word": "打算", "pinyin": "dǎ suàn", "translation": "plan", "audio": "audio/dasuan.mp3" },
  { "word": "护照", "pinyin": "hù zhào", "translation": "passport", "audio": "audio/huzhao.mp3" },
  { "word": "担心", "pinyin": "dān xīn", "translation": "worry", "audio": "audio/danxin.mp3" },
  { "word": "提高", "pinyin": "tí gāo", "translation": "improve, raise", "audio": "audio/tigao.mp3" },
  { "word": "放心", "pinyin": "fàng xīn", "translation": "be at ease", "audio": "audio/fangxin.mp3" },
  { "word": "故事", "pinyin": "gù shi", "translation": "story", "audio": "audio/gushi.mp3" },
  { "word": "数学", "pinyin": "shù xué", "translation": "mathematics", "audio": "audio/shuxue.mp3" },
  { "word": "文化", "pinyin": "wén huà", "translation": "culture", "audio": "audio/wenhua.mp3" },
  { "word": "新闻", "pinyin": "xīn wén", "translation": "news", "audio": "audio/xinwen.mp3" },
  { "word": "新鲜", "pinyin": "xīn xiān", "translation": "fresh", "audio": "audio/xinxian.mp3" },
  { "word": "方便", "pinyin": "fāng biàn", "translation": "convenient", "audio": "audio/fangbian.mp3" },
  { "word": "明白", "pinyin": "míng bai", "translation": "understand", "audio": "audio/mingbai.mp3" },
  { "word": "月亮", "pinyin": "yuè liàng", "translation": "moon", "audio": "audio/yueliang.mp3" },
  { "word": "有名", "pinyin": "yǒu míng", "translation": "famous", "audio": "audio/youming.mp3" },
  { "word": "机会", "pinyin": "jī huì", "translation": "opportunity", "audio": "audio/jihui.mp3" },
  { "word": "校长", "pinyin": "xiào zhǎng", "translation": "principal", "audio": "audio/xiaozhang.mp3" },
  { "word": "根据", "pinyin": "gēn jù", "translation": "according to", "audio": "audio/genju.mp3" },
  { "word": "检查", "pinyin": "jiǎn chá", "translation": "check, examine", "audio": "audio/jiancha.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "欢迎", "pinyin": "huānyíng", "translation": "welcome", "audio": "audio/huanying.mp3" },
  { "word": "比赛", "pinyin": "bǐ sài", "translation": "competition, match", "audio": "audio/bisai.mp3" },
  { "word": "比较", "pinyin": "bǐ jiào", "translation": "compare", "audio": "audio/bijiao.mp3" },
  { "word": "水平", "pinyin": "shuǐ píng", "translation": "level, standard", "audio": "audio/shuiping.mp3" },
  { "word": "注意", "pinyin": "zhù yì", "translation": "pay attention", "audio": "audio/zhuyi.mp3" },
  { "word": "洗澡", "pinyin": "xǐ zǎo", "translation": "take a bath", "audio": "audio/xizao.mp3" },
  { "word": "清楚", "pinyin": "qīng chǔ", "translation": "clear", "audio": "audio/qingchu.mp3" },
  { "word": "游戏", "pinyin": "yóu xì", "translation": "game", "audio": "audio/youxi.mp3" },
  { "word": "满意", "pinyin": "mǎn yì", "translation": "satisfied", "audio": "audio/manyi.mp3" },
  { "word": "热情", "pinyin": "rè qíng", "translation": "enthusiastic", "audio": "audio/reqing.mp3" },
  { "word": "然后", "pinyin": "rán hòu", "translation": "then", "audio": "audio/ranhou.mp3" },
  { "word": "照片", "pinyin": "zhào piàn", "translation": "photo", "audio": "audio/zhaopian.mp3" },
  { "word": "照顾", "pinyin": "zhào gù", "translation": "take care of", "audio": "audio/zhaogu.mp3" },
  { "word": "熊猫", "pinyin": "xóng māo", "translation": "panda", "audio": "audio/xiongmao.mp3" },
  { "word": "爬山", "pinyin": "pá shān", "translation": "climb a mountain", "audio": "audio/pashan.mp3" },
  { "word": "爱好", "pinyin": "ài hào", "translation": "hobby", "audio": "audio/aihao.mp3" },
  { "word": "爷爷", "pinyin": "yé ye", "translation": "grandfather", "audio": "audio/yeye.mp3" },
  { "word": "特别", "pinyin": "tè bié", "translation": "special", "audio": "audio/tebie.mp3" },
  { "word": "环境", "pinyin": "huán jìng", "translation": "environment", "audio": "audio/huanjing.mp3" },
  { "word": "瓶子", "pinyin": "píng zi", "translation": "bottle", "audio": "audio/pingzi.mp3" },
  { "word": "生气", "pinyin": "shēng qì", "translation": "get angry", "audio": "audio/shengqi.mp3" },
  { "word": "电梯", "pinyin": "diàn tī", "translation": "elevator", "audio": "audio/dianti.mp3" },
  { "word": "留学", "pinyin": "liú xué", "translation": "study abroad", "audio": "audio/liuxue.mp3" },
  { "word": "皮鞋", "pinyin": "pí xié", "translation": "leather shoes", "audio": "audio/pixie.mp3" },
  { "word": "盘子", "pinyin": "pán zi", "translation": "plate", "audio": "audio/panzi.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "相信", "pinyin": "xiāngxìn", "translation": "believe", "audio": "audio/xiangxin.mp3" },
  { "word": "着急", "pinyin": "zhuó jí", "translation": "be anxious", "audio": "audio/zhuoji.mp3" },
  { "word": "礼物", "pinyin": "lǐ wù", "translation": "gift", "audio": "audio/liwu.mp3" },
  { "word": "离开", "pinyin": "lí kāi", "translation": "leave", "audio": "audio/likai.mp3" },
  { "word": "空调", "pinyin": "kōng tiáo", "translation": "air conditioner", "audio": "audio/kongtiao.mp3" },
  { "word": "突然", "pinyin": "tūrán", "translation": "suddenly", "audio": "audio/turan.mp3" },
  { "word": "筷子", "pinyin": "kuài zi", "translation": "chopsticks", "audio": "audio/kuaizi.mp3" },
  { "word": "简单", "pinyin": "jiǎn dān", "translation": "simple", "audio": "audio/jiandan.mp3" },
  { "word": "练习", "pinyin": "liàn xí", "translation": "practice", "audio": "audio/lianxi.mp3" },
  { "word": "终于", "pinyin": "zhōng yú", "translation": "finally", "audio": "audio/zhongyu.mp3" },
  { "word": "经常", "pinyin": "jīng cháng", "translation": "often", "audio": "audio/jingchang.mp3" },
  { "word": "经理", "pinyin": "jīng lǐ", "translation": "manager", "audio": "audio/jingli.mp3" },
  { "word": "经过", "pinyin": "jīng guò", "translation": "pass by", "audio": "audio/jingguo.mp3" },
  { "word": "结婚", "pinyin": "jié hūn", "translation": "get married", "audio": "audio/jiehun.mp3" },
  { "word": "结束", "pinyin": "jié shù", "translation": "end", "audio": "audio/jieshu.mp3" },
  { "word": "耳朵", "pinyin": "ěr duo", "translation": "ear", "audio": "audio/erduo.mp3" },
  { "word": "聪明", "pinyin": "cōng ming", "translation": "smart", "audio": "audio/congming.mp3" },
  { "word": "自己", "pinyin": "zì jǐ", "translation": "oneself", "audio": "audio/ziji.mp3" },
  { "word": "舒服", "pinyin": "shū fú", "translation": "comfortable", "audio": "audio/shufu.mp3" },
  { "word": "节日", "pinyin": "jié rì", "translation": "holiday", "audio": "audio/jieri.mp3" },
  { "word": "节目", "pinyin": "jié mù", "translation": "program", "audio": "audio/jiemu.mp3" },
  { "word": "菜单", "pinyin": "cài dān", "translation": "menu", "audio": "audio/caidan.mp3" },
  { "word": "蛋糕", "pinyin": "dàn gāo", "translation": "cake", "audio": "audio/dangao.mp3" },
  { "word": "街道", "pinyin": "jiē dào", "translation": "street", "audio": "audio/jiedao.mp3" },
  { "word": "衬衫", "pinyin": "chèn shān", "translation": "shirt", "audio": "audio/chenshan.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "裙子", "pinyin": "qún zi", "translation": "skirt", "audio": "audio/qunzi.mp3" },
  { "word": "裤子", "pinyin": "kù zi", "translation": "pants", "audio": "audio/kuzi.mp3" },
  { "word": "要求", "pinyin": "yāo qiú", "translation": "demand, request", "audio": "audio/yaoqiu.mp3" },
  { "word": "见面", "pinyin": "jiàn miàn", "translation": "meet", "audio": "audio/jianmian.mp3" },
  { "word": "解决", "pinyin": "jiě jué", "translation": "solve", "audio": "audio/jiejue.mp3" },
  { "word": "认为", "pinyin": "rèn wéi", "translation": "think, believe", "audio": "audio/renwei.mp3" },
  { "word": "认真", "pinyin": "rèn zhēn", "translation": "serious, earnest", "audio": "audio/renzhen.mp3" },
  { "word": "记得", "pinyin": "jì de", "translation": "remember", "audio": "audio/jide.mp3" },
  { "word": "词典", "pinyin": "cí diǎn", "translation": "dictionary", "audio": "audio/cidian.mp3" },
  { "word": "请假", "pinyin": "qǐng jià", "translation": "ask for leave", "audio": "audio/qingjia.mp3" },
  { "word": "起来", "pinyin": "qǐ lái", "translation": "get up, stand up", "audio": "audio/qilai.mp3" },
  { "word": "起飞", "pinyin": "qǐ fēi", "translation": "take off (fly)", "audio": "audio/qifei.mp3" },
  { "word": "超市", "pinyin": "chāo shì", "translation": "supermarket", "audio": "audio/chaoshi.mp3" },
  { "word": "过去", "pinyin": "guò qù", "translation": "past, go", "audio": "audio/guoqu.mp3" },
  { "word": "还是", "pinyin": "hái shì", "translation": "still, or", "audio": "audio/haishi.mp3" },
  { "word": "迟到", "pinyin": "chí dào", "translation": "be late", "audio": "audio/chidao.mp3" },
  { "word": "选择", "pinyin": "xuǎn zé", "translation": "choose", "audio": "audio/xuanze.mp3" },
  { "word": "遇到", "pinyin": "yù dào", "translation": "meet, encounter", "audio": "audio/yudao.mp3" },
  { "word": "邻居", "pinyin": "lín jū", "translation": "neighbor", "audio": "audio/linju.mp3" },
  { "word": "重要", "pinyin": "zhòng yào", "translation": "important", "audio": "audio/zhongyao.mp3" },
  { "word": "银行", "pinyin": "yín háng", "translation": "bank", "audio": "audio/yinhang.mp3" },
  { "word": "锻炼", "pinyin": "duàn liàn", "translation": "exercise", "audio": "audio/duanlian.mp3" },
  { "word": "阿姨", "pinyin": "ā yí", "translation": "aunt", "audio": "audio/ayi.mp3" },
  { "word": "附近", "pinyin": "fù jìn", "translation": "nearby", "audio": "audio/fujin.mp3" },
  { "word": "除了", "pinyin": "chú le", "translation": "except", "audio": "audio/chule.mp3" },
  // ---------------------------------------------------------------------------------------
  { "word": "难过", "pinyin": "nán guò", "translation": "sad", "audio": "audio/nanguo.mp3" },
  { "word": "需要", "pinyin": "xū yào", "translation": "need", "audio": "audio/xuyao.mp3" },
  { "word": "面包", "pinyin": "miàn bāo", "translation": "bread", "audio": "audio/mianbao.mp3" },
  { "word": "音乐", "pinyin": "yīn yuè", "translation": "music", "audio": "audio/yinyue.mp3" },
  { "word": "饮料", "pinyin": "yǐn liào", "translation": "beverage", "audio": "audio/yinliao.mp3" },
  { "word": "香蕉", "pinyin": "xiāng jiāo", "translation": "banana", "audio": "audio/xiangjiao.mp3" },
  { "word": "马上", "pinyin": "mǎ shàng", "translation": "immediately", "audio": "audio/mashang.mp3" },
  { "word": "黄河", "pinyin": "huáng hé", "translation": "Yellow River", "audio": "audio/huanghe.mp3" },
  { "word": "黑板", "pinyin": "hēi bǎn", "translation": "blackboard", "audio": "audio/heiban.mp3" },
  { "word": "鼻子", "pinyin": "bí zi", "translation": "nose", "audio": "audio/bizi.mp3" },
  { "word": "北方", "pinyin": "běi fāng", "translation": "north", "audio": "audio/beifang.mp3" },
  { "word": "聊天", "pinyin": "liáo tiān", "translation": "chat", "audio": "audio/liaotian.mp3" },
  { "word": "一会儿", "pinyin": "yī huì er", "translation": "a while", "audio": "audio/yihuier.mp3" },
  { "word": "信用卡", "pinyin": "xìn yòng kǎ", "translation": "credit card", "audio": "audio/xinyongka.mp3" },
  { "word": "办公室", "pinyin": "bàn gōng shì", "translation": "office", "audio": "audio/bangongshi.mp3" },
  { "word": "只有才", "pinyin": "zhǐ yǒu cái", "translation": "only then", "audio": "audio/zhiyoucai.mp3" },
  { "word": "图书馆", "pinyin": "tú shū guǎn", "translation": "library", "audio": "audio/tushuguan.mp3" },
  { "word": "感兴趣", "pinyin": "gǎn xìng qù", "translation": "be interested in", "audio": "audio/ganxingqu.mp3" },
  { "word": "洗手间", "pinyin": "xǐ shǒu jiān", "translation": "washroom", "audio": "audio/xishoujian.mp3" },
  { "word": "照相机", "pinyin": "zhào xiàng jī", "translation": "camera", "audio": "audio/zhaoxiangji.mp3" },
  { "word": "自行车", "pinyin": "zì xíng chē", "translation": "bicycle", "audio": "audio/zixingche.mp3" },
  { "word": "行李箱", "pinyin": "xíng lǐ xiāng", "translation": "suitcase", "audio": "audio/xinglixiang.mp3" },
  { "word": "笔记本", "pinyin": "bǐ jì běn", "translation": "notebook", "audio": "audio/bijiben.mp3" },
  { "word": "不但而且", "pinyin": "bù dàn ér qiě", "translation": "not only but also", "audio": "audio/budanerqie.mp3" },
  { "word": "电子邮件", "pinyin": "diàn zǐ yóu jiàn", "translation": "email", "audio": "audio/dianziyoujian.mp3" }
];

// دالة لإنشاء قائمة الكلمات
function createWordList() {
  // مسح محتوى قائمة الكلمات
  wordList.innerHTML = '';

  // إعادة إنشاء قائمة الكلمات 
  hsk3Words.forEach((word, index) => { 
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span class="word-number">${index + 1}. </span> <span class="chinese">${word.word}</span>
      <span class="pinyin">${word.pinyin}</span>
      <audio src="${word.audio}"></audio> 
    `;

    listItem.addEventListener('click', () => {
      const pinyinSpan = listItem.querySelector('.pinyin');
      pinyinSpan.classList.add('show'); // أضف class show عند النقر

      // تشغيل الصوت عند النقر على الكلمة
      const audio = listItem.querySelector('audio');
      audio.currentTime = 0; // إعادة تشغيل الصوت من البداية
      audio.play(); 

      // اخفاء البينيين بعد ثانية 
      setTimeout(() => {
        pinyinSpan.classList.remove('show'); // أزل class show بعد ثانية
      }, 1000);
    });

    wordList.appendChild(listItem);
  });
}

// دالة لخلط الكلمات بشكل عشوائي
function shuffleWords() {
  for (let i = hsk3Words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hsk3Words[i], hsk3Words[j]] = [hsk3Words[j], hsk3Words[i]];
  }
  createWordList(); 
}

// دالة لبدء المؤقت
function startTimer() {
  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes < 1 || minutes > 10) {
    alert('Please enter a number between 1 and 10.');
    return;
  }

  startTime = minutes * 60; 
  timerElement.innerText = `${minutes.toString().padStart(2, '0')}:00`;

  timerInterval = setInterval(updateTimer, 1000); 
}

// دالة لتحديث المؤقت
function updateTimer() {
  if (startTime > 0) {
    const minutes = Math.floor(startTime / 60);
    const seconds = startTime % 60;
    timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    startTime--;
  } else {
    clearInterval(timerInterval);
    timerElement.innerText = "Stop, time is up!"; 
    timeoutSound.play(); 
  }
}

// دالة لإظهار/إخفاء البينيين وتغيير نص الزر 
function togglePinyin() {
  const pinyinElements = document.querySelectorAll('.pinyin');
  pinyinElements.forEach(pinyin => {
    pinyin.classList.toggle('show');
  });

  //  تغيير نص الزر 
  if (showPinyinButton.innerText === 'Show Pinyin') {
    showPinyinButton.innerText = 'Hide Pinyin';
  } else {
    showPinyinButton.innerText = 'Show Pinyin';
  }
}

// إضافة Events Listeners للزر 
startButton.addEventListener('click', startTimer);
showPinyinButton.addEventListener('click', togglePinyin);
shuffleButton.addEventListener('click', shuffleWords); 

// إنشاء القائمة عند تحميل الصفحة
createWordList(); 


// ... (Your existing code)

// دالة لخلط الكلمات بشكل عشوائي
function shuffleWords() {
    for (let i = hsk3Words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hsk3Words[i], hsk3Words[j]] = [hsk3Words[j], hsk3Words[i]];
    }
    createWordList(); 
  }
  
  // دالة لبدء المؤقت
  function startTimer() {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes < 1 || minutes > 10) {
      alert('Please enter a number between 1 and 10.');
      return;
    }
  
    startTime = minutes * 60; 
    timerElement.innerText = `${minutes.toString().padStart(2, '0')}:00`;
  
    timerInterval = setInterval(updateTimer, 1000); 
  }
  
  // دالة لتحديث المؤقت
  function updateTimer() {
    if (startTime > 0) {
      const minutes = Math.floor(startTime / 60);
      const seconds = startTime % 60;
      timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      startTime--;
    } else {
      clearInterval(timerInterval);
      timerElement.innerText = "Stop, time is up!"; 
      timeoutSound.play(); 
    }
  }
  
  // دالة لإظهار/إخفاء البينيين وتغيير نص الزر 
  function togglePinyin() {
    const pinyinElements = document.querySelectorAll('.pinyin');
    pinyinElements.forEach(pinyin => {
      pinyin.classList.toggle('show');
    });
  
    //  تغيير نص الزر 
    if (showPinyinButton.innerText === 'Show Pinyin') {
      showPinyinButton.innerText = 'Hide Pinyin';
    } else {
      showPinyinButton.innerText = 'Show Pinyin';
    }
  }
  
  // إضافة Events Listeners للزر 
  startButton.addEventListener('click', startTimer);
  showPinyinButton.addEventListener('click', togglePinyin);
  shuffleButton.addEventListener('click', shuffleWords); 
  
  // إنشاء القائمة عند تحميل الصفحة
  createWordList(); 