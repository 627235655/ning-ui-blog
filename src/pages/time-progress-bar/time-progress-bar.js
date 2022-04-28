import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./time-progress-bar.scss";

const ONE_DAY_TIME_GAP = 1000 * 60 * 60 * 24;
const PROGRESS_DIV_WIDTH = 360;
const lunar = {
  tg: "甲乙丙丁戊己庚辛壬癸",
  dz: "子丑寅卯辰巳午未申酉戌亥",
  number: "一二三四五六七八九十",
  year: "鼠牛虎兔龙蛇马羊猴鸡狗猪",
  month: "正二三四五六七八九十冬腊",
  monthadd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  calendar: [
    0xa4b, 0x5164b, 0x6a5, 0x6d4, 0x415b5, 0x2b6, 0x957, 0x2092f, 0x497,
    0x60c96, 0xd4a, 0xea5, 0x50da9, 0x5ad, 0x2b6, 0x3126e, 0x92e, 0x7192d,
    0xc95, 0xd4a, 0x61b4a, 0xb55, 0x56a, 0x4155b, 0x25d, 0x92d, 0x2192b, 0xa95,
    0x71695, 0x6ca, 0xb55, 0x50ab5, 0x4da, 0xa5b, 0x30a57, 0x52b, 0x8152a,
    0xe95, 0x6aa, 0x615aa, 0xab5, 0x4b6, 0x414ae, 0xa57, 0x526, 0x31d26, 0xd95,
    0x70b55, 0x56a, 0x96d, 0x5095d, 0x4ad, 0xa4d, 0x41a4d, 0xd25, 0x81aa5,
    0xb54, 0xb6a, 0x612da, 0x95b, 0x49b, 0x41497, 0xa4b, 0xa164b, 0x6a5, 0x6d4,
    0x615b4, 0xab6, 0x957, 0x5092f, 0x497, 0x64b, 0x30d4a, 0xea5, 0x80d65,
    0x5ac, 0xab6, 0x5126d, 0x92e, 0xc96, 0x41a95, 0xd4a, 0xda5, 0x20b55, 0x56a,
    0x7155b, 0x25d, 0x92d, 0x5192b, 0xa95, 0xb4a, 0x416aa, 0xad5, 0x90ab5,
    0x4ba, 0xa5b, 0x60a57, 0x52b, 0xa93, 0x40e95
  ]
};
const digest_list = [
  {
    title: "《剑来》",
    content: "言念君子，温其如玉",
    author: "齐静春"
  },
  {
    title: "《晁错论》",
    content: "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志",
    author: "苏轼"
  },
  {
    title: "《尽心章句上》",
    content: "穷则独善其身，达则兼济天下",
    author: "孟子"
  },
  {
    title: "《对话老师》",
    content: "享受生命中每一个脚步",
    author: "许嵩"
  },
  {
    title: "《罗素论幸福》",
    content: "真正的幸福来自于建设性的工作",
    author: "罗素"
  },
  {
    title: "《了凡四训》",
    content: "昨日种种，譬如昨日死；今日种种，譬如今日生",
    author: "袁了凡"
  },
  {
    title: "《鹧鸪天·彩袖殷勤捧玉钟》",
    content: "今宵剩把银红照，犹恐相逢是梦中",
    author: "晏几道"
  },
  {
    title: "《Dota 2》",
    content: "与其感慨路难行，不如马上出发",
    author: "克林克兹"
  }
];

class TimeProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      day: null,
      weekly_day: null,
      cn_year_animal: null,
      cn_year: null,
      cn_month: null,
      cn_day: null,
      yearly_day: null,
      progress: null,
      digest: {}
    };
  }

  componentDidMount() {
    this.initPage();
  }

  initPage = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let format_date = year + "-" + month + "-" + day;
    let weekly_day =
      "星期" + ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
    let lunar_date = this.getLunarDateString(this.getLunarDate(format_date));
    let cn_year = lunar_date?.tg + lunar_date?.dz + "年";
    let cn_year_animal = lunar_date.year;
    let cn_month = lunar_date.month + "月";
    let cn_day = lunar_date.day;
    let yearly_day = this.getYearlyDay(format_date);
    let progress = this.getYearProgress(yearly_day, date);
    let digest = digest_list[Math.floor(Math.random() * digest_list.length)];
    this.setState({
      year,
      month,
      day,
      weekly_day,
      cn_year_animal,
      cn_year,
      cn_month,
      cn_day,
      yearly_day,
      progress,
      digest
    });
  };

  getLunarDate = (date) => {
    var year, month, day;
    if (!date) {
      (date = new Date()),
        (year = date.getFullYear()),
        (month = date.getMonth()),
        (day = date.getDate());
    } else {
      (date = date.split("-")),
        (year = parseInt(date[0])),
        (month = date[1] - 1),
        (day = parseInt(date[2]));
    }

    if (year < 1921 || year > 3020) {
      return {};
    }

    var total, m, n, k, bit, lunarYear, lunarMonth, lunarDay;
    var isEnd = false;
    var tmp = year;
    if (tmp < 1900) {
      tmp += 1900;
    }
    total =
      (tmp - 1921) * 365 +
      Math.floor((tmp - 1921) / 4) +
      lunar.monthadd[month] +
      day -
      38;
    if (year % 4 == 0 && month > 1) {
      total++;
    }
    for (m = 0; ; m++) {
      k = lunar.calendar[m] < 0xfff ? 11 : 12;
      for (n = k; n >= 0; n--) {
        bit = (lunar.calendar[m] >> n) & 1;
        if (total <= 29 + bit) {
          isEnd = true;
          break;
        }
        total = total - 29 - bit;
      }
      if (isEnd) break;
    }
    lunarYear = 1921 + m;
    lunarMonth = k - n + 1;
    lunarDay = total;
    if (k == 12) {
      if (lunarMonth == Math.floor(lunar.calendar[m] / 0x10000) + 1) {
        lunarMonth = 1 - lunarMonth;
      }
      if (lunarMonth > Math.floor(lunar.calendar[m] / 0x10000) + 1) {
        lunarMonth--;
      }
    }

    return {
      lunarYear: lunarYear,
      lunarMonth: lunarMonth,
      lunarDay: lunarDay
    };
  };

  getLunarDateString = (lunarDate) => {
    if (!lunarDate.lunarDay) return;
    var data = {},
      lunarYear = lunarDate.lunarYear,
      lunarMonth = lunarDate.lunarMonth,
      lunarDay = lunarDate.lunarDay;

    data.tg = lunar.tg.charAt((lunarYear - 4) % 10);
    data.dz = lunar.dz.charAt((lunarYear - 4) % 12);
    data.year = lunar.year.charAt((lunarYear - 4) % 12);
    data.month =
      lunarMonth < 1
        ? "(闰)" + lunar.month.charAt(-lunarMonth - 1)
        : lunar.month.charAt(lunarMonth - 1);
    data.day =
      lunarDay < 11
        ? "初"
        : lunarDay < 20
        ? "十"
        : lunarDay < 30
        ? "廿"
        : "三十";

    if (lunarDay % 10 != 0 || lunarDay == 10) {
      data.day += lunar.number.charAt((lunarDay - 1) % 10);
    }
    return data;
  };

  getYearlyDay = (format_date) => {
    let year = new Date(format_date).getFullYear(),
      yearly_day =
        (new Date(format_date).getTime() -
          new Date(year + "-01-01").getTime()) /
          ONE_DAY_TIME_GAP +
        1;
    return yearly_day;
  };

  getYearProgress = (yearly_day, date) => {
    let year = date.getFullYear(),
      all_days =
        (new Date(year + "-12-31").getTime() -
          new Date(year + "-01-01").getTime()) /
          ONE_DAY_TIME_GAP +
        1,
      progress = ((yearly_day / all_days) * 100).toFixed(2);
    return progress;
  };

  render() {
    return (
      <div className="time-progress-bar">
        <Link className="ning-line-btn _fill _fillet" to="/index/home">
          返回首页
        </Link>
        <div className="wrap">
          <h3 className="header">
            <span>
              {this.state.year + "." + this.state.month + "." + this.state.day}
            </span>
            <span>{this.state.weekly_day}</span>
          </h3>
          <h1 className="m-t-md">{this.state.day}</h1>
          <p>
            {this.state.cn_year}&nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.cn_year_animal}&nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.cn_month}
            {this.state.cn_day}
          </p>
          <p>
            第 {this.state.yearly_day} 天，进度已消耗 {this.state.progress} %
          </p>
          <div
            className="progress"
            style={{
              borderLeftWidth:
                (this.state.progress / 100) * PROGRESS_DIV_WIDTH + "px"
            }}
          ></div>
          <div className="digest-wrap">
            <p>{this.state.digest.title}</p>
            <h3>{this.state.digest.content}</h3>
            <p className="author">--- {this.state.digest.author}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeProgressBar;
