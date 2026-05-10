"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/node-cron/src/task.js
var require_task = __commonJS({
  "node_modules/node-cron/src/task.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var Task = class extends EventEmitter {
      constructor(execution) {
        super();
        if (typeof execution !== "function") {
          throw "execution must be a function";
        }
        this._execution = execution;
      }
      execute(now) {
        let exec;
        try {
          exec = this._execution(now);
        } catch (error) {
          return this.emit("task-failed", error);
        }
        if (exec instanceof Promise) {
          return exec.then(() => this.emit("task-finished")).catch((error) => this.emit("task-failed", error));
        } else {
          this.emit("task-finished");
          return exec;
        }
      }
    };
    module2.exports = Task;
  }
});

// node_modules/node-cron/src/convert-expression/month-names-conversion.js
var require_month_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/month-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];
      const shortMonths = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ];
      function convertMonthName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10) + 1);
        }
        return expression;
      }
      function interprete(monthExpression) {
        monthExpression = convertMonthName(monthExpression, months);
        monthExpression = convertMonthName(monthExpression, shortMonths);
        return monthExpression;
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/week-day-names-conversion.js
var require_week_day_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/week-day-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const weekDays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      const shortWeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      function convertWeekDayName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10));
        }
        return expression;
      }
      function convertWeekDays(expression) {
        expression = expression.replace("7", "0");
        expression = convertWeekDayName(expression, weekDays);
        return convertWeekDayName(expression, shortWeekDays);
      }
      return convertWeekDays;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js
var require_asterisk_to_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertAsterisk(expression, replecement) {
        if (expression.indexOf("*") !== -1) {
          return expression.replace("*", replecement);
        }
        return expression;
      }
      function convertAsterisksToRanges(expressions) {
        expressions[0] = convertAsterisk(expressions[0], "0-59");
        expressions[1] = convertAsterisk(expressions[1], "0-59");
        expressions[2] = convertAsterisk(expressions[2], "0-23");
        expressions[3] = convertAsterisk(expressions[3], "1-31");
        expressions[4] = convertAsterisk(expressions[4], "1-12");
        expressions[5] = convertAsterisk(expressions[5], "0-6");
        return expressions;
      }
      return convertAsterisksToRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/range-conversion.js
var require_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function replaceWithRange(expression, text, init, end) {
        const numbers = [];
        let last = parseInt(end);
        let first = parseInt(init);
        if (first > last) {
          last = parseInt(init);
          first = parseInt(end);
        }
        for (let i = first; i <= last; i++) {
          numbers.push(i);
        }
        return expression.replace(new RegExp(text, "i"), numbers.join());
      }
      function convertRange(expression) {
        const rangeRegEx = /(\d+)-(\d+)/;
        let match2 = rangeRegEx.exec(expression);
        while (match2 !== null && match2.length > 0) {
          expression = replaceWithRange(expression, match2[0], match2[1], match2[2]);
          match2 = rangeRegEx.exec(expression);
        }
        return expression;
      }
      function convertAllRanges(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          expressions[i] = convertRange(expressions[i]);
        }
        return expressions;
      }
      return convertAllRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/step-values-conversion.js
var require_step_values_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/step-values-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertSteps(expressions) {
        var stepValuePattern = /^(.+)\/(\w+)$/;
        for (var i = 0; i < expressions.length; i++) {
          var match2 = stepValuePattern.exec(expressions[i]);
          var isStepValue = match2 !== null && match2.length > 0;
          if (isStepValue) {
            var baseDivider = match2[2];
            if (isNaN(baseDivider)) {
              throw baseDivider + " is not a valid step value";
            }
            var values = match2[1].split(",");
            var stepValues = [];
            var divider = parseInt(baseDivider, 10);
            for (var j = 0; j <= values.length; j++) {
              var value = parseInt(values[j], 10);
              if (value % divider === 0) {
                stepValues.push(value);
              }
            }
            expressions[i] = stepValues.join(",");
          }
        }
        return expressions;
      }
      return convertSteps;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/index.js
var require_convert_expression = __commonJS({
  "node_modules/node-cron/src/convert-expression/index.js"(exports2, module2) {
    "use strict";
    var monthNamesConversion = require_month_names_conversion();
    var weekDayNamesConversion = require_week_day_names_conversion();
    var convertAsterisksToRanges = require_asterisk_to_range_conversion();
    var convertRanges = require_range_conversion();
    var convertSteps = require_step_values_conversion();
    module2.exports = /* @__PURE__ */ (() => {
      function appendSeccondExpression(expressions) {
        if (expressions.length === 5) {
          return ["0"].concat(expressions);
        }
        return expressions;
      }
      function removeSpaces(str) {
        return str.replace(/\s{2,}/g, " ").trim();
      }
      function normalizeIntegers(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          const numbers = expressions[i].split(",");
          for (let j = 0; j < numbers.length; j++) {
            numbers[j] = parseInt(numbers[j]);
          }
          expressions[i] = numbers;
        }
        return expressions;
      }
      function interprete(expression) {
        let expressions = removeSpaces(expression).split(" ");
        expressions = appendSeccondExpression(expressions);
        expressions[4] = monthNamesConversion(expressions[4]);
        expressions[5] = weekDayNamesConversion(expressions[5]);
        expressions = convertAsterisksToRanges(expressions);
        expressions = convertRanges(expressions);
        expressions = convertSteps(expressions);
        expressions = normalizeIntegers(expressions);
        return expressions.join(" ");
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/pattern-validation.js
var require_pattern_validation = __commonJS({
  "node_modules/node-cron/src/pattern-validation.js"(exports2, module2) {
    "use strict";
    var convertExpression = require_convert_expression();
    var validationRegex = /^(?:\d+|\*|\*\/\d+)$/;
    function isValidExpression(expression, min, max) {
      const options = expression.split(",");
      for (const option of options) {
        const optionAsInt = parseInt(option, 10);
        if (!Number.isNaN(optionAsInt) && (optionAsInt < min || optionAsInt > max) || !validationRegex.test(option))
          return false;
      }
      return true;
    }
    function isInvalidSecond(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidMinute(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidHour(expression) {
      return !isValidExpression(expression, 0, 23);
    }
    function isInvalidDayOfMonth(expression) {
      return !isValidExpression(expression, 1, 31);
    }
    function isInvalidMonth(expression) {
      return !isValidExpression(expression, 1, 12);
    }
    function isInvalidWeekDay(expression) {
      return !isValidExpression(expression, 0, 7);
    }
    function validateFields(patterns, executablePatterns) {
      if (isInvalidSecond(executablePatterns[0]))
        throw new Error(`${patterns[0]} is a invalid expression for second`);
      if (isInvalidMinute(executablePatterns[1]))
        throw new Error(`${patterns[1]} is a invalid expression for minute`);
      if (isInvalidHour(executablePatterns[2]))
        throw new Error(`${patterns[2]} is a invalid expression for hour`);
      if (isInvalidDayOfMonth(executablePatterns[3]))
        throw new Error(
          `${patterns[3]} is a invalid expression for day of month`
        );
      if (isInvalidMonth(executablePatterns[4]))
        throw new Error(`${patterns[4]} is a invalid expression for month`);
      if (isInvalidWeekDay(executablePatterns[5]))
        throw new Error(`${patterns[5]} is a invalid expression for week day`);
    }
    function validate2(pattern) {
      if (typeof pattern !== "string")
        throw new TypeError("pattern must be a string!");
      const patterns = pattern.split(" ");
      const executablePatterns = convertExpression(pattern).split(" ");
      if (patterns.length === 5) patterns.unshift("0");
      validateFields(patterns, executablePatterns);
    }
    module2.exports = validate2;
  }
});

// node_modules/node-cron/src/time-matcher.js
var require_time_matcher = __commonJS({
  "node_modules/node-cron/src/time-matcher.js"(exports2, module2) {
    var validatePattern = require_pattern_validation();
    var convertExpression = require_convert_expression();
    function matchPattern(pattern, value) {
      if (pattern.indexOf(",") !== -1) {
        const patterns = pattern.split(",");
        return patterns.indexOf(value.toString()) !== -1;
      }
      return pattern === value.toString();
    }
    var TimeMatcher = class {
      constructor(pattern, timezone) {
        validatePattern(pattern);
        this.pattern = convertExpression(pattern);
        this.timezone = timezone;
        this.expressions = this.pattern.split(" ");
        this.dtf = this.timezone ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
          fractionalSecondDigits: 3,
          timeZone: this.timezone
        }) : null;
      }
      match(date) {
        date = this.apply(date);
        const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
        const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
        const runOnHour = matchPattern(this.expressions[2], date.getHours());
        const runOnDay = matchPattern(this.expressions[3], date.getDate());
        const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
        const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());
        return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
      }
      apply(date) {
        if (this.dtf) {
          return new Date(this.dtf.format(date));
        }
        return date;
      }
    };
    module2.exports = TimeMatcher;
  }
});

// node_modules/node-cron/src/scheduler.js
var require_scheduler = __commonJS({
  "node_modules/node-cron/src/scheduler.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var TimeMatcher = require_time_matcher();
    var Scheduler = class extends EventEmitter {
      constructor(pattern, timezone, autorecover) {
        super();
        this.timeMatcher = new TimeMatcher(pattern, timezone);
        this.autorecover = autorecover;
      }
      start() {
        this.stop();
        let lastCheck = process.hrtime();
        let lastExecution = this.timeMatcher.apply(/* @__PURE__ */ new Date());
        const matchTime = () => {
          const delay = 1e3;
          const elapsedTime = process.hrtime(lastCheck);
          const elapsedMs = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6;
          const missedExecutions = Math.floor(elapsedMs / 1e3);
          for (let i = missedExecutions; i >= 0; i--) {
            const date = new Date((/* @__PURE__ */ new Date()).getTime() - i * 1e3);
            let date_tmp = this.timeMatcher.apply(date);
            if (lastExecution.getTime() < date_tmp.getTime() && (i === 0 || this.autorecover) && this.timeMatcher.match(date)) {
              this.emit("scheduled-time-matched", date_tmp);
              date_tmp.setMilliseconds(0);
              lastExecution = date_tmp;
            }
          }
          lastCheck = process.hrtime();
          this.timeout = setTimeout(matchTime, delay);
        };
        matchTime();
      }
      stop() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = null;
      }
    };
    module2.exports = Scheduler;
  }
});

// node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto2.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto2, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto2 = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto3.default.createHash("md5").update(bytes).digest();
}
var import_crypto3, md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto3 = __toESM(require("crypto"));
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto4.default.createHash("sha1").update(bytes).digest();
}
var import_crypto4, sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto4 = __toESM(require("crypto"));
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/node-cron/src/scheduled-task.js
var require_scheduled_task = __commonJS({
  "node_modules/node-cron/src/scheduled-task.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var Task = require_task();
    var Scheduler = require_scheduler();
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var ScheduledTask = class extends EventEmitter {
      constructor(cronExpression, func, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        this._task = new Task(func);
        this._scheduler = new Scheduler(cronExpression, options.timezone, options.recoverMissedExecutions);
        this._scheduler.on("scheduled-time-matched", (now) => {
          this.now(now);
        });
        if (options.scheduled !== false) {
          this._scheduler.start();
        }
        if (options.runOnInit === true) {
          this.now("init");
        }
      }
      now(now = "manual") {
        let result = this._task.execute(now);
        this.emit("task-done", result);
      }
      start() {
        this._scheduler.start();
      }
      stop() {
        this._scheduler.stop();
      }
    };
    module2.exports = ScheduledTask;
  }
});

// node_modules/node-cron/src/background-scheduled-task/index.js
var require_background_scheduled_task = __commonJS({
  "node_modules/node-cron/src/background-scheduled-task/index.js"(exports2, module2) {
    var EventEmitter = require("events");
    var path2 = require("path");
    var { fork } = require("child_process");
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var daemonPath = `${__dirname}/daemon.js`;
    var BackgroundScheduledTask = class extends EventEmitter {
      constructor(cronExpression, taskPath, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.cronExpression = cronExpression;
        this.taskPath = taskPath;
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        if (options.scheduled) {
          this.start();
        }
      }
      start() {
        this.stop();
        this.forkProcess = fork(daemonPath);
        this.forkProcess.on("message", (message) => {
          switch (message.type) {
            case "task-done":
              this.emit("task-done", message.result);
              break;
          }
        });
        let options = this.options;
        options.scheduled = true;
        this.forkProcess.send({
          type: "register",
          path: path2.resolve(this.taskPath),
          cron: this.cronExpression,
          options
        });
      }
      stop() {
        if (this.forkProcess) {
          this.forkProcess.kill();
        }
      }
      pid() {
        if (this.forkProcess) {
          return this.forkProcess.pid;
        }
      }
      isRunning() {
        return !this.forkProcess.killed;
      }
    };
    module2.exports = BackgroundScheduledTask;
  }
});

// node_modules/node-cron/src/storage.js
var require_storage = __commonJS({
  "node_modules/node-cron/src/storage.js"(exports2, module2) {
    module2.exports = (() => {
      if (!global.scheduledTasks) {
        global.scheduledTasks = /* @__PURE__ */ new Map();
      }
      return {
        save: (task) => {
          if (!task.options) {
            const uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
            task.options = {};
            task.options.name = uuid.v4();
          }
          global.scheduledTasks.set(task.options.name, task);
        },
        getTasks: () => {
          return global.scheduledTasks;
        }
      };
    })();
  }
});

// node_modules/node-cron/src/node-cron.js
var require_node_cron = __commonJS({
  "node_modules/node-cron/src/node-cron.js"(exports2, module2) {
    "use strict";
    var ScheduledTask = require_scheduled_task();
    var BackgroundScheduledTask = require_background_scheduled_task();
    var validation = require_pattern_validation();
    var storage = require_storage();
    function schedule2(expression, func, options) {
      const task = createTask(expression, func, options);
      storage.save(task);
      return task;
    }
    function createTask(expression, func, options) {
      if (typeof func === "string")
        return new BackgroundScheduledTask(expression, func, options);
      return new ScheduledTask(expression, func, options);
    }
    function validate2(expression) {
      try {
        validation(expression);
        return true;
      } catch (_) {
        return false;
      }
    }
    function getTasks() {
      return storage.getTasks();
    }
    module2.exports = { schedule: schedule2, validate: validate2, getTasks };
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path2 = require("path");
    var os2 = require("os");
    var crypto6 = require("crypto");
    var packageJson = require_package();
    var version2 = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match2;
      while ((match2 = LINE.exec(lines)) != null) {
        const key = match2[1];
        let value = match2[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.log(`[dotenv@${version2}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version2}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version2}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path2.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto6.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse: parse2,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/storage/sqlite.ts
var sqlite_exports = {};
__export(sqlite_exports, {
  SQLiteStorage: () => SQLiteStorage
});
var import_better_sqlite3, import_fs, import_path, SQLiteStorage;
var init_sqlite = __esm({
  "src/storage/sqlite.ts"() {
    "use strict";
    import_better_sqlite3 = __toESM(require("better-sqlite3"));
    import_fs = require("fs");
    import_path = require("path");
    SQLiteStorage = class {
      db;
      stmtGet;
      stmtPut;
      constructor(dbPath) {
        const dir = (0, import_path.dirname)(dbPath);
        if (!(0, import_fs.existsSync)(dir)) {
          (0, import_fs.mkdirSync)(dir, { recursive: true });
        }
        this.db = new import_better_sqlite3.default(dbPath);
        this.db.pragma("journal_mode = WAL");
        this.db.exec("CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL)");
        this.stmtGet = this.db.prepare("SELECT value FROM kv WHERE key = ?");
        this.stmtPut = this.db.prepare("INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)");
      }
      async get(key) {
        const row = this.stmtGet.get(key);
        return row ? row.value : null;
      }
      async put(key, value) {
        this.stmtPut.run(key, value);
      }
      close() {
        this.db.close();
      }
    };
  }
});

// src/storage/json-file.ts
var json_file_exports = {};
__export(json_file_exports, {
  JsonFileStorage: () => JsonFileStorage
});
var import_fs2, import_path2, JsonFileStorage;
var init_json_file = __esm({
  "src/storage/json-file.ts"() {
    "use strict";
    import_fs2 = require("fs");
    import_path2 = require("path");
    JsonFileStorage = class {
      data;
      filePath;
      constructor(filePath) {
        this.filePath = filePath;
        const dir = (0, import_path2.dirname)(filePath);
        if (!(0, import_fs2.existsSync)(dir)) {
          (0, import_fs2.mkdirSync)(dir, { recursive: true });
        }
        if ((0, import_fs2.existsSync)(filePath)) {
          try {
            this.data = JSON.parse((0, import_fs2.readFileSync)(filePath, "utf-8"));
          } catch {
            this.data = {};
          }
        } else {
          this.data = {};
        }
      }
      async get(key) {
        return this.data[key] ?? null;
      }
      async put(key, value) {
        this.data[key] = value;
        (0, import_fs2.writeFileSync)(this.filePath, JSON.stringify(this.data, null, 2));
      }
    };
  }
});

// node_modules/@hono/node-server/dist/index.mjs
var import_http = require("http");
var import_http2 = require("http2");
var import_http22 = require("http2");
var import_stream = require("stream");
var import_crypto = __toESM(require("crypto"), 1);
var RequestError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "RequestError";
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = (incoming) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
};
var wrapBodyStream = Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
  const init = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request2(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= import_stream.Readable.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        }
      });
    } else {
      init.body = import_stream.Readable.toWeb(incoming);
    }
  }
  return new Request2(url, init);
};
var getRequestCache = Symbol("getRequestCache");
var requestCache = Symbol("requestCache");
var incomingKey = Symbol("incomingKey");
var urlKey = Symbol("urlKey");
var headersKey = Symbol("headersKey");
var abortControllerKey = Symbol("abortControllerKey");
var getAbortController = Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: function() {
      return this[getRequestCache]()[k]();
    }
  });
});
Object.defineProperty(requestPrototype, Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      method: this.method,
      url: this.url,
      headers: this.headers,
      nativeRequest: this[requestCache]
    };
    return `Request (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const incomingUrl = incoming.url || "";
  if (incomingUrl[0] !== "/" && // short-circuit for performance. most requests are relative URL.
  (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
    if (incoming instanceof import_http22.Http2ServerRequest) {
      throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
    }
    try {
      const url2 = new URL(incomingUrl);
      req[urlKey] = url2.href;
    } catch (e) {
      throw new RequestError("Invalid absolute URL", { cause: e });
    }
    return req;
  }
  const host = (incoming instanceof import_http22.Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  let scheme;
  if (incoming instanceof import_http22.Http2ServerRequest) {
    scheme = incoming.scheme;
    if (!(scheme === "http" || scheme === "https")) {
      throw new RequestError("Unsupported scheme");
    }
  } else {
    scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
  }
  const url = new URL(`${scheme}://${host}${incomingUrl}`);
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
var responseCache = Symbol("responseCache");
var getResponseCache = Symbol("getResponseCache");
var cacheKey = Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    let headers;
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
        headers = new Headers(init.#init.headers);
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      ;
      this[cacheKey] = [init?.status || 200, body, headers || init?.headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(
          cache[2] || { "content-type": "text/plain; charset=UTF-8" }
        );
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: function() {
      return this[getResponseCache]()[k]();
    }
  });
});
Object.defineProperty(Response2.prototype, Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      status: this.status,
      headers: this.headers,
      ok: this.ok,
      nativeResponse: this[responseCache]
    };
    return `Response (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = (error) => {
    reader.cancel(error).catch(() => {
    });
  };
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error) {
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, handleStreamError);
      }
    } catch (e) {
      handleStreamError(e);
    }
  }
}
function writeFromReadableStream(stream, writable) {
  if (stream.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    return;
  }
  return writeFromReadableStreamDefaultReader(stream.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  if (!(headers instanceof Headers)) {
    headers = new Headers(headers ?? void 0);
  }
  const cookies = [];
  for (const [k, v] of headers) {
    if (k === "set-cookie") {
      cookies.push(v);
    } else {
      res[k] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
if (typeof global.crypto === "undefined") {
  global.crypto = import_crypto.default;
}
var outgoingEnded = Symbol("outgoingEnded");
var incomingDraining = Symbol("incomingDraining");
var DRAIN_TIMEOUT_MS = 500;
var MAX_DRAIN_BYTES = 64 * 1024 * 1024;
var drainIncoming = (incoming) => {
  const incomingWithDrainState = incoming;
  if (incoming.destroyed || incomingWithDrainState[incomingDraining]) {
    return;
  }
  incomingWithDrainState[incomingDraining] = true;
  if (incoming instanceof import_http2.Http2ServerRequest) {
    try {
      ;
      incoming.stream?.close?.(import_http2.constants.NGHTTP2_NO_ERROR);
    } catch {
    }
    return;
  }
  let bytesRead = 0;
  const cleanup = () => {
    clearTimeout(timer);
    incoming.off("data", onData);
    incoming.off("end", cleanup);
    incoming.off("error", cleanup);
  };
  const forceClose = () => {
    cleanup();
    const socket = incoming.socket;
    if (socket && !socket.destroyed) {
      socket.destroySoon();
    }
  };
  const timer = setTimeout(forceClose, DRAIN_TIMEOUT_MS);
  timer.unref?.();
  const onData = (chunk) => {
    bytesRead += chunk.length;
    if (bytesRead > MAX_DRAIN_BYTES) {
      forceClose();
    }
  };
  incoming.on("data", onData);
  incoming.on("end", cleanup);
  incoming.on("error", cleanup);
  incoming.resume();
};
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err.message}`);
    outgoing.destroy(err);
  }
};
var flushHeaders = (outgoing) => {
  if ("flushHeaders" in outgoing && outgoing.writable) {
    outgoing.flushHeaders();
  }
};
var responseViaCache = async (res, outgoing) => {
  let [status, body, header] = res[cacheKey];
  let hasContentLength = false;
  if (!header) {
    header = { "content-type": "text/plain; charset=UTF-8" };
  } else if (header instanceof Headers) {
    hasContentLength = header.has("content-length");
    header = buildOutgoingHttpHeaders(header);
  } else if (Array.isArray(header)) {
    const headerObj = new Headers(header);
    hasContentLength = headerObj.has("content-length");
    header = buildOutgoingHttpHeaders(headerObj);
  } else {
    for (const key in header) {
      if (key.length === 14 && key.toLowerCase() === "content-length") {
        hasContentLength = true;
        break;
      }
    }
  }
  if (!hasContentLength) {
    if (typeof body === "string") {
      header["Content-Length"] = Buffer.byteLength(body);
    } else if (body instanceof Uint8Array) {
      header["Content-Length"] = body.byteLength;
    } else if (body instanceof Blob) {
      header["Content-Length"] = body.size;
    }
  }
  outgoing.writeHead(status, header);
  if (typeof body === "string" || body instanceof Uint8Array) {
    outgoing.end(body);
  } else if (body instanceof Blob) {
    outgoing.end(new Uint8Array(await body.arrayBuffer()));
  } else {
    flushHeaders(outgoing);
    await writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
  ;
  outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (isPromise(res)) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  if (res.body) {
    const reader = res.body.getReader();
    const values = [];
    let done = false;
    let currentReadPromise = void 0;
    if (resHeaderRecord["transfer-encoding"] !== "chunked") {
      let maxReadCount = 2;
      for (let i = 0; i < maxReadCount; i++) {
        currentReadPromise ||= reader.read();
        const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
          console.error(e);
          done = true;
        });
        if (!chunk) {
          if (i === 1) {
            await new Promise((resolve2) => setTimeout(resolve2));
            maxReadCount = 3;
            continue;
          }
          break;
        }
        currentReadPromise = void 0;
        if (chunk.value) {
          values.push(chunk.value);
        }
        if (chunk.done) {
          done = true;
          break;
        }
      }
      if (done && !("content-length" in resHeaderRecord)) {
        resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
      }
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    values.forEach((value) => {
      ;
      outgoing.write(value);
    });
    if (done) {
      outgoing.end();
    } else {
      if (values.length === 0) {
        flushHeaders(outgoing);
      }
      await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
  ;
  outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
  const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
  if (options.overrideGlobalObjects !== false && global.Request !== Request2) {
    Object.defineProperty(global, "Request", {
      value: Request2
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
      if (!incomingEnded) {
        ;
        incoming[wrapBodyStream] = true;
        incoming.on("end", () => {
          incomingEnded = true;
        });
        if (incoming instanceof import_http2.Http2ServerRequest) {
          ;
          outgoing[outgoingEnded] = () => {
            if (!incomingEnded) {
              setTimeout(() => {
                if (!incomingEnded) {
                  setTimeout(() => {
                    drainIncoming(incoming);
                  });
                }
              });
            }
          };
        }
        outgoing.on("finish", () => {
          if (!incomingEnded) {
            drainIncoming(incoming);
          }
        });
      }
      outgoing.on("close", () => {
        const abortController = req[abortControllerKey];
        if (abortController) {
          if (incoming.errored) {
            req[abortControllerKey].abort(incoming.errored.toString());
          } else if (!outgoing.writableFinished) {
            req[abortControllerKey].abort("Client connection prematurely closed.");
          }
        }
        if (!incomingEnded) {
          setTimeout(() => {
            if (!incomingEnded) {
              setTimeout(() => {
                drainIncoming(incoming);
              });
            }
          });
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return await responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var createAdaptorServer = (options) => {
  const fetchCallback = options.fetch;
  const requestListener = getRequestListener(fetchCallback, {
    hostname: options.hostname,
    overrideGlobalObjects: options.overrideGlobalObjects,
    autoCleanupIncoming: options.autoCleanupIncoming
  });
  const createServer = options.createServer || import_http.createServer;
  const server = createServer(options.serverOptions || {}, requestListener);
  return server;
};
var serve = (options, listeningListener) => {
  const server = createAdaptorServer(options);
  server.listen(options?.port ?? 3e3, options.hostname, () => {
    const serverInfo = server.address();
    listeningListener && listeningListener(serverInfo);
  });
  return server;
};

// src/node-entry.ts
var cron = __toESM(require_node_cron());
var dotenv = __toESM(require_main());
var path = __toESM(require("path"));
var os = __toESM(require("os"));

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path2) => {
  const paths = path2.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path: path2 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path2);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path2) => {
  const groups = [];
  path2 = path2.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path2 };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path2 = url.slice(start, end);
      return tryDecodeURI(path2.includes("%25") ? path2.replace(/%25/g, "%2525") : path2);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path2) => {
  if (path2.charCodeAt(path2.length - 1) !== 63 || !path2.includes(":")) {
    return null;
  }
  const segments = path2.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path2 = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path2;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path2, ...handlers) => {
      for (const p of [path2].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path2, app) {
    const subApp = this.basePath(path2);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path2) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path2);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path2, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path2);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path2, "*"), handler);
    return this;
  }
  #addRoute(method, path2, handler) {
    method = method.toUpperCase();
    path2 = mergePath(this._basePath, path2);
    const r = { basePath: this._basePath, path: path2, method, handler };
    this.router.add(method, path2, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path2 = this.getPath(request, { env });
    const matchResult = this.router.match(method, path2);
    const c = new Context(request, {
      path: path2,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path2) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path2);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path2, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path2 = path2.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path2.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path2) {
  return wildcardRegExpCache[path2] ??= new RegExp(
    path2 === "*" ? "" : `^${path2.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path2, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path2] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path2, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path2) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path2) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path2)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path2, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path2 === "/*") {
      path2 = "*";
    }
    const paramCount = (path2.match(/\/:/g) || []).length;
    if (/\*$/.test(path2)) {
      const re = buildWildcardRegExp(path2);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path2] ||= findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        });
      } else {
        middleware[method][path2] ||= findMiddleware(middleware[method], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path2) || [path2];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path22 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path22] ||= [
            ...findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || []
          ];
          routes[m][path22].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path2) => [path2, r[method][path2]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path2) => [path2, r[METHOD_NAME_ALL][path2]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path2, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path2, handler]);
  }
  match(method, path2) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path2);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path2, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path2);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path2) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path2);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path2[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path2.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path2, handler) {
    const results = checkOptionalParameter(path2);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path2, handler);
  }
  match(method, path2) {
    return this.#node.search(method, path2);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// src/core/config.ts
var DEFAULT_SPEED_TIMEOUT_MS = 5e3;
var DEFAULT_SITE_TIMEOUT_MS = 3e3;
var DEFAULT_FETCH_TIMEOUT_MS = 5e3;
var KV_MERGED_CONFIG = "merged_config";
var KV_MERGED_CONFIG_FULL = "merged_config_full";
var KV_SOURCE_URLS = "source_urls";
var KV_LAST_UPDATE = "last_update";
var KV_MANUAL_SOURCES = "manual_sources";
var KV_MACCMS_SOURCES = "maccms_sources";
var KV_LIVE_SOURCES = "live_sources";
var LIVE_PROXY_TTL = 7200;
var KV_BLACKLIST = "blacklist";
var KV_INLINE_PREFIX = "inline_config_";
var KV_NAME_TRANSFORM = "name_transform";
var KV_CRON_INTERVAL = "cron_interval";
var DEFAULT_CRON_INTERVAL = 1440;

// src/core/decoder.ts
async function decodeConfigResponse(buffer, configKey) {
  const utf8Text = new TextDecoder("utf-8").decode(buffer);
  if (isJson(utf8Text)) {
    return utf8Text;
  }
  const text = new TextDecoder("latin1").decode(buffer);
  const imageDecoded = decodeImageWrapped(text);
  if (imageDecoded !== null) {
    console.log("[decoder] Decoded image-wrapped base64 config");
    return imageDecoded;
  }
  if (text.startsWith("2423")) {
    try {
      const cbcResult = await decryptAesCbc(text);
      if (cbcResult !== null) {
        console.log("[decoder] Decoded AES CBC config");
        return cbcResult;
      }
    } catch (e) {
      console.warn("[decoder] AES CBC decryption failed:", e);
    }
  }
  if (configKey && !isJson(text)) {
    try {
      const ecbResult = await decryptAesEcb(text, configKey);
      if (ecbResult !== null) {
        console.log("[decoder] Decoded AES ECB config");
        return ecbResult;
      }
    } catch (e) {
      console.warn("[decoder] AES ECB decryption failed:", e);
    }
  }
  return utf8Text;
}
function decodeImageWrapped(text) {
  const marker = /[A-Za-z0]{8}\*\*/;
  const match2 = marker.exec(text);
  if (!match2) return null;
  const base64Start = match2.index + 10;
  const base64Data = text.substring(base64Start).trim();
  if (!base64Data) return null;
  try {
    return base64Decode(base64Data);
  } catch {
    return null;
  }
}
async function decryptAesCbc(hexContent) {
  const separatorIndex = hexContent.indexOf("2324");
  if (separatorIndex === -1) return null;
  const data = hexContent.substring(separatorIndex + 4, hexContent.length - 26);
  const fullStr = hexToString(hexContent).toLowerCase();
  const keyStart = fullStr.indexOf("$#");
  const keyEnd = fullStr.indexOf("#$");
  if (keyStart === -1 || keyEnd === -1) return null;
  const key = rightPadding(fullStr.substring(keyStart + 2, keyEnd), "0", 16);
  const iv = rightPadding(fullStr.substring(fullStr.length - 13), "0", 16);
  const cipherBytes = hexToBytes(data);
  const keyBytes = new TextEncoder().encode(key);
  const ivBytes = new TextEncoder().encode(iv);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
  return new TextDecoder("utf-8").decode(decrypted);
}
async function decryptAesEcb(hexContent, key) {
  const paddedKey = rightPadding(key, "0", 16);
  const cipherBytes = hexToBytes(hexContent);
  const keyBytes = new TextEncoder().encode(paddedKey);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const zeroIv = new Uint8Array(16);
  const blocks = [];
  for (let i = 0; i < cipherBytes.length; i += 16) {
    const block = cipherBytes.slice(i, i + 16);
    if (i + 16 < cipherBytes.length) {
      const paddedBlock = new Uint8Array(32);
      paddedBlock.set(block, 0);
      for (let j = 16; j < 32; j++) paddedBlock[j] = 16;
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: zeroIv },
        cryptoKey,
        paddedBlock
      );
      blocks.push(new Uint8Array(decrypted));
    } else {
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: zeroIv },
        cryptoKey,
        block
      );
      blocks.push(new Uint8Array(decrypted));
    }
  }
  const totalLength = blocks.reduce((sum, b) => sum + b.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const b of blocks) {
    result.set(b, offset);
    offset += b.length;
  }
  return new TextDecoder("utf-8").decode(result);
}
function rightPadding(str, pad, length) {
  let result = str;
  while (result.length < length) {
    result += pad;
  }
  return result.substring(0, length);
}
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
function hexToString(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return str;
}
function isJson(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}
function base64Decode(data) {
  if (typeof atob === "function") {
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
  }
  return Buffer.from(data, "base64").toString("utf-8");
}

// src/core/fetcher.ts
var MAX_MULTI_REPO_DEPTH = 3;
async function fetchConfigs(sources, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) {
  const configs = [];
  const seen = /* @__PURE__ */ new Set();
  await expandSources(sources, configs, seen, timeoutMs, 0);
  console.log(`[fetcher] Fetched ${configs.length} configs from ${sources.length} top-level sources`);
  return configs;
}
async function expandSources(sources, configs, seen, timeoutMs, depth) {
  const uniqueSources = sources.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
  if (uniqueSources.length === 0) return;
  const tag = depth === 0 ? "" : ` (depth ${depth})`;
  console.log(`[fetcher] Fetching ${uniqueSources.length} sources${tag}...`);
  const results = await Promise.allSettled(
    uniqueSources.map((source) => fetchSingleConfig(source, timeoutMs))
  );
  const multiRepoChildren = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled" && result.value) {
      if (isMultiRepoConfig(result.value.config)) {
        const children = extractMultiRepoEntries(result.value.config, result.value.sourceName);
        console.log(`[fetcher] Multi-repo: ${uniqueSources[i].url} \u2192 ${children.length} sub-sources`);
        if (depth < MAX_MULTI_REPO_DEPTH) {
          multiRepoChildren.push(...children);
        } else {
          console.log(`[fetcher] Max depth reached, skipping expansion of ${uniqueSources[i].url}`);
        }
      } else {
        configs.push(result.value);
      }
    } else if (result.status === "rejected") {
      console.warn(`[fetcher] Failed: ${uniqueSources[i].url}: ${result.reason}`);
    }
  }
  if (multiRepoChildren.length > 0) {
    await expandSources(multiRepoChildren, configs, seen, timeoutMs, depth + 1);
  }
}
async function fetchSingleConfig(source, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const startTime = Date.now();
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "okhttp/3.12.0"
      }
    });
    if (!response.ok) {
      console.warn(`[fetcher] ${source.url} returned ${response.status}`);
      return null;
    }
    const buffer = await response.arrayBuffer();
    const decoded = await decodeConfigResponse(buffer, source.configKey);
    if (!decoded) {
      console.warn(`[fetcher] ${source.url} returned undecodable content`);
      return null;
    }
    const config2 = parseConfigJson(decoded);
    if (!config2) {
      console.warn(`[fetcher] ${source.url} returned invalid JSON after decoding`);
      return null;
    }
    const speedMs = Date.now() - startTime;
    return {
      sourceUrl: source.url,
      sourceName: source.name,
      config: config2,
      speedMs
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("abort")) {
      console.warn(`[fetcher] ${source.url} timed out (${timeoutMs}ms)`);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}
function parseConfigJson(text) {
  let cleaned = text.replace(/^\uFEFF/, "");
  cleaned = cleaned.trim();
  const jsonpMatch = cleaned.match(/^\w+\(([\s\S]+)\)$/);
  if (jsonpMatch) {
    cleaned = jsonpMatch[1];
  }
  let parsed = tryParseJson(cleaned);
  if (!parsed) {
    const stripped = stripJsonComments(cleaned);
    parsed = tryParseJson(stripped);
  }
  if (!parsed) return null;
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
  return parsed;
}
function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
function isMultiRepoConfig(config2) {
  const raw2 = config2;
  if (Array.isArray(raw2.storeHouse)) return true;
  if (Array.isArray(raw2.urls) && !config2.sites) return true;
  return false;
}
function extractMultiRepoEntries(config2, parentName) {
  const raw2 = config2;
  const entries = [];
  if (Array.isArray(raw2.storeHouse)) {
    for (const item of raw2.storeHouse) {
      const url = item?.sourceUrl;
      if (typeof url === "string" && url.trim()) {
        entries.push({
          name: typeof item.sourceName === "string" ? item.sourceName : parentName,
          url: url.trim()
        });
      }
    }
  } else if (Array.isArray(raw2.urls)) {
    for (const item of raw2.urls) {
      const url = item?.url;
      if (typeof url === "string" && url.trim()) {
        entries.push({
          name: typeof item.name === "string" ? item.name : parentName,
          url: url.trim()
        });
      }
    }
  }
  return entries;
}
function stripJsonComments(text) {
  let result = "";
  let inString = false;
  let escape = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      result += ch;
      escape = false;
      continue;
    }
    if (ch === "\\" && inString) {
      result += ch;
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }
    if (!inString && ch === "/" && text[i + 1] === "/") {
      const newline = text.indexOf("\n", i);
      if (newline === -1) break;
      i = newline - 1;
      continue;
    }
    result += ch;
  }
  return result;
}

// src/core/maccms.ts
async function validateMacCMS(api, timeoutMs) {
  const url = api.includes("?") ? `${api}&ac=list` : `${api}?ac=list`;
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const speedMs = Date.now() - start;
    if (!resp.ok) return { ok: false, speedMs };
    const data = await resp.json();
    const ok = !!(data && (data.class || data.list));
    return { ok, speedMs };
  } catch {
    return { ok: false, speedMs: Date.now() - start };
  }
}
function macCMSToTVBoxSites(entries, workerBaseUrl, speedMap) {
  return entries.map((entry) => {
    let name = entry.name;
    const speedMs = speedMap?.get(entry.key);
    if (speedMs != null) {
      const seconds = (speedMs / 1e3).toFixed(1);
      name = `${name} [${seconds}s]`;
    }
    return {
      key: entry.key,
      name,
      type: 1,
      api: workerBaseUrl ? `${workerBaseUrl.replace(/\/$/, "")}/api/${entry.key}` : entry.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1
    };
  });
}
async function processMacCMSForLocal(entries, timeoutMs) {
  if (entries.length === 0) return { passed: [], speedMap: /* @__PURE__ */ new Map() };
  console.log(`[maccms] Validating ${entries.length} MacCMS sources...`);
  const results = await Promise.allSettled(
    entries.map(async (entry) => {
      const validation = await validateMacCMS(entry.api, timeoutMs);
      return { entry, validation };
    })
  );
  const passed = [];
  const speedMap = /* @__PURE__ */ new Map();
  for (const result of results) {
    if (result.status === "fulfilled") {
      const { entry, validation } = result.value;
      if (validation.ok) {
        passed.push(entry);
        speedMap.set(entry.key, validation.speedMs);
      } else {
        console.log(`[maccms] Filtered out ${entry.key}: validation failed (${validation.speedMs}ms)`);
      }
    } else {
      console.log(`[maccms] Filtered out unknown: ${result.reason}`);
    }
  }
  console.log(
    `[maccms] ${passed.length}/${entries.length} MacCMS sources passed validation`
  );
  return { passed, speedMap };
}

// src/core/jar-proxy.ts
var KV_JAR_PREFIX = "jar:";
function parseSpiderString(spider) {
  let prefix = "";
  let rest = spider;
  if (rest.startsWith("img+")) {
    prefix = "img+";
    rest = rest.substring(4);
  }
  const md5Idx = rest.indexOf(";md5;");
  if (md5Idx !== -1) {
    const url = rest.substring(0, md5Idx);
    const md52 = rest.substring(md5Idx + 5);
    return { prefix, url, md5: md52, raw: spider };
  }
  return { prefix, url: rest, md5: null, raw: spider };
}
async function urlToKey(url) {
  const data = new TextEncoder().encode(url);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function buildRewrittenSpider(spider, workerBaseUrl, urlKeyMap) {
  if (!spider) return null;
  const parsed = parseSpiderString(spider);
  if (!parsed.url.startsWith("http://") && !parsed.url.startsWith("https://")) {
    return null;
  }
  const key = urlKeyMap.get(parsed.url);
  if (!key) return null;
  const proxyUrl = `${workerBaseUrl.replace(/\/$/, "")}/jar/${key}`;
  if (parsed.md5) {
    return `${parsed.prefix}${proxyUrl};md5;${parsed.md5}`;
  }
  return `${parsed.prefix}${proxyUrl}`;
}
async function rewriteJarUrls(config2, workerBaseUrl, storage) {
  const uniqueJars = /* @__PURE__ */ new Map();
  if (config2.spider) {
    const parsed = parseSpiderString(config2.spider);
    if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
      uniqueJars.set(parsed.url, { md5: parsed.md5 });
    }
  }
  for (const site of config2.sites || []) {
    if (site.jar) {
      const parsed = parseSpiderString(site.jar);
      if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
        if (!uniqueJars.has(parsed.url)) {
          uniqueJars.set(parsed.url, { md5: parsed.md5 });
        }
      }
    }
  }
  if (uniqueJars.size === 0) {
    console.log("[jar-proxy] No JAR URLs to rewrite");
    return config2;
  }
  const urlKeyMap = /* @__PURE__ */ new Map();
  for (const [url, { md5: md52 }] of uniqueJars) {
    const key = md52 || await urlToKey(url);
    urlKeyMap.set(url, key);
    await storage.put(`${KV_JAR_PREFIX}${key}`, url);
    console.log(`[jar-proxy] Mapped ${key} \u2192 ${url.substring(0, 60)}...`);
  }
  console.log(`[jar-proxy] Wrote ${urlKeyMap.size} KV mappings`);
  const result = { ...config2 };
  if (result.spider) {
    const rewritten = buildRewrittenSpider(result.spider, workerBaseUrl, urlKeyMap);
    if (rewritten) result.spider = rewritten;
  }
  if (result.sites) {
    result.sites = result.sites.map((site) => {
      if (!site.jar) return site;
      const rewritten = buildRewrittenSpider(site.jar, workerBaseUrl, urlKeyMap);
      if (rewritten) return { ...site, jar: rewritten };
      return site;
    });
  }
  console.log(`[jar-proxy] Rewrote ${urlKeyMap.size} unique JAR URLs across config`);
  return result;
}
async function lookupJarUrl(key, storage) {
  return storage.get(`${KV_JAR_PREFIX}${key}`);
}
function isMd5Key(key) {
  return /^[0-9a-f]{32}$/i.test(key);
}

// src/core/live-source.ts
var KV_LIVE_PREFIX = "live:";
async function urlToKey2(url) {
  const data = new TextEncoder().encode(url);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function testLiveSource(entry, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const start = Date.now();
    const resp = await fetch(entry.url, {
      signal: controller.signal,
      headers: { "User-Agent": "okhttp/3.12.0" }
    });
    const speedMs = Date.now() - start;
    if (!resp.ok) {
      return { name: entry.name, url: entry.url, reachable: false, speedMs };
    }
    const reader = resp.body?.getReader();
    if (reader) {
      try {
        const { value } = await reader.read();
        if (value) {
          const text = new TextDecoder().decode(value.slice(0, 1024));
          const looksValid = text.includes("#EXTM3U") || text.includes(",http") || text.includes("CCTV") || text.includes("#EXTINF") || /^.+,https?:\/\//m.test(text);
          if (!looksValid) {
            console.log(`[live-source] ${entry.name}: content doesn't look like m3u/txt, keeping anyway`);
          }
        }
      } finally {
        reader.cancel().catch(() => {
        });
      }
    }
    return { name: entry.name, url: entry.url, reachable: true, speedMs };
  } catch {
    return { name: entry.name, url: entry.url, reachable: false, speedMs: 0 };
  } finally {
    clearTimeout(timer);
  }
}
async function batchTestLiveSources(entries, timeoutMs) {
  if (entries.length === 0) return { passed: [], speedMap: /* @__PURE__ */ new Map() };
  console.log(`[live-source] Testing ${entries.length} live sources concurrently...`);
  const results = await Promise.allSettled(
    entries.map((entry) => testLiveSource(entry, timeoutMs))
  );
  const passed = [];
  const speedMap = /* @__PURE__ */ new Map();
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.reachable) {
      passed.push({ name: result.value.name, url: result.value.url });
      speedMap.set(result.value.url, result.value.speedMs);
    } else if (result.status === "fulfilled") {
      console.log(`[live-source] Dropped: ${result.value.name} (unreachable)`);
    }
  }
  console.log(`[live-source] ${passed.length}/${entries.length} live sources reachable`);
  return { passed, speedMap };
}
async function liveSourcesToTVBoxLives(entries, workerBaseUrl, storage, speedMap) {
  const lives = [];
  for (const entry of entries) {
    let url = entry.url;
    let name = entry.name;
    if (workerBaseUrl) {
      const key = await urlToKey2(entry.url);
      await storage.put(`${KV_LIVE_PREFIX}${key}`, entry.url);
      url = `${workerBaseUrl.replace(/\/$/, "")}/live/${key}`;
    } else if (speedMap) {
      const ms = speedMap.get(entry.url);
      if (ms != null) {
        name = `${name} [${(ms / 1e3).toFixed(1)}s]`;
      }
    }
    lives.push({
      name,
      type: 0,
      url
    });
  }
  if (workerBaseUrl) {
    console.log(`[live-source] Wrote ${entries.length} KV proxy mappings`);
  }
  return lives;
}
async function lookupLiveUrl(key, storage) {
  return storage.get(`${KV_LIVE_PREFIX}${key}`);
}

// src/core/shared-styles.ts
var sharedStyles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box}

:root{
  --bg:#0a0e14;
  --surface:#111720;
  --surface-2:#161d2a;
  --border:#1e2a3a;
  --border-glow:#2a3f5f;
  --green:#00e5a0;
  --green-dim:#00e5a033;
  --green-glow:#00e5a066;
  --amber:#f0a030;
  --amber-dim:#f0a03033;
  --red:#ff4060;
  --red-dim:#ff406033;
  --blue:#4da6ff;
  --blue-dim:#4da6ff33;
  --text:#c8d6e5;
  --text-dim:#5a6d82;
  --mono:'JetBrains Mono',monospace;
  --sans:'Outfit',sans-serif;
}

html{font-size:16px}
body{
  background:var(--bg);
  color:var(--text);
  font-family:var(--sans);
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
}

body::after{
  content:'';
  position:fixed;
  inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);
  pointer-events:none;
  z-index:1000;
}

body::before{
  content:'';
  position:fixed;
  inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, #00e5a008 0%, transparent 70%),
    linear-gradient(rgba(30,42,58,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,42,58,0.3) 1px, transparent 1px);
  background-size:100% 100%, 60px 60px, 60px 60px;
  pointer-events:none;
  z-index:0;
}

.container{
  max-width:860px;
  margin:0 auto;
  padding:40px 24px 80px;
  position:relative;
  z-index:1;
}

/* Header */
.header{
  margin-bottom:24px;
  animation:fadeSlideDown 0.6s ease-out;
}

.header-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.header-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.2em;
  text-transform:uppercase;
  color:var(--green);
  opacity:0.7;
  margin-bottom:8px;
  display:flex;
  align-items:center;
  gap:8px;
}

.header-label::before{
  content:'';
  display:inline-block;
  width:8px;height:8px;
  background:var(--green);
  border-radius:50%;
  animation:pulse 2s ease-in-out infinite;
}

.header-title{
  font-family:var(--sans);
  font-size:2rem;
  font-weight:700;
  letter-spacing:-0.02em;
  color:#fff;
  line-height:1.2;
}

.header-title span{color:var(--green)}

.header-nav{
  display:flex;
  gap:12px;
  margin-top:16px;
}

.header-nav a{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--text-dim);
  text-decoration:none;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  transition:all 0.2s;
}

.header-nav a:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

/* Language toggle */
.lang-toggle{
  font-family:var(--mono);
  font-size:0.65rem;
  font-weight:500;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  background:transparent;
  color:var(--text-dim);
  cursor:pointer;
  transition:all 0.2s;
  letter-spacing:0.05em;
}

.lang-toggle:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

/* Login overlay */
.login-overlay{
  position:fixed;
  inset:0;
  background:var(--bg);
  z-index:900;
  display:flex;
  align-items:center;
  justify-content:center;
}

.login-box{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:40px;
  width:360px;
  max-width:90vw;
  animation:fadeSlideUp 0.4s ease-out;
}

.login-box h2{
  font-family:var(--sans);
  font-size:1.4rem;
  font-weight:700;
  color:#fff;
  margin-bottom:8px;
}

.login-box p{
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
  letter-spacing:0.1em;
  text-transform:uppercase;
  margin-bottom:24px;
}

.login-box input{
  width:100%;
  font-family:var(--mono);
  font-size:0.85rem;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  outline:none;
  margin-bottom:16px;
  transition:border-color 0.2s;
}

.login-box input:focus{border-color:var(--green)}

.login-box .error-msg{
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--red);
  margin-bottom:12px;
  display:none;
}

/* Buttons */
.btn{
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:600;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:10px 20px;
  background:transparent;
  border:1px solid var(--green);
  color:var(--green);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.3s;
  white-space:nowrap;
}

.btn:hover{
  background:var(--green-dim);
  box-shadow:0 0 20px var(--green-dim);
}

.btn:active{transform:scale(0.97)}

.btn.loading{
  color:var(--amber);
  border-color:var(--amber);
  pointer-events:none;
}

.btn-danger, .btn.danger{
  border-color:var(--red);
  color:var(--red);
}

.btn-danger:hover, .btn.danger:hover{
  background:var(--red-dim);
  box-shadow:0 0 20px var(--red-dim);
}

.btn.secondary{
  border-color:var(--amber);
  color:var(--amber);
}

.btn.secondary:hover{
  background:var(--amber-dim);
  box-shadow:0 0 20px var(--amber-dim);
}

.btn-sm, .btn.sm{
  padding:6px 12px;
  font-size:0.65rem;
}

/* Tabs */
.tabs{
  display:flex;
  gap:0;
  margin-bottom:20px;
  border-bottom:1px solid var(--border);
}

.tab{
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:500;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:12px 20px;
  color:var(--text-dim);
  cursor:pointer;
  border-bottom:2px solid transparent;
  transition:all 0.2s;
  user-select:none;
}

.tab:hover{color:var(--text)}

.tab.active{
  color:var(--green);
  border-bottom-color:var(--green);
}

.tab .badge{
  display:inline-block;
  font-size:0.6rem;
  padding:1px 6px;
  border-radius:8px;
  margin-left:6px;
  background:var(--surface-2);
  color:var(--text-dim);
}

.tab.active .badge{
  background:var(--green-dim);
  color:var(--green);
}

.tab-panel{display:none}
.tab-panel.active{display:block}

/* Search bar */
.search-bar{
  margin-bottom:16px;
  display:flex;
  gap:10px;
}

.search-bar input{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:10px 14px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  outline:none;
  transition:border-color 0.2s;
}

.search-bar input:focus{border-color:var(--green)}
.search-bar input::placeholder{color:var(--text-dim)}

/* Section cards */
.section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  margin-bottom:20px;
  position:relative;
  overflow:hidden;
}

.section::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.section-title{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.section-title .count{
  font-size:0.75rem;
  color:var(--green);
  font-weight:600;
}

/* Source list */
.source-list{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.source-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  transition:border-color 0.2s;
}

.source-item:hover{border-color:var(--border-glow)}

.source-tag{
  font-family:var(--mono);
  font-size:0.6rem;
  font-weight:600;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:3px 8px;
  border-radius:3px;
  flex-shrink:0;
}

.source-tag.scraped{
  background:var(--blue-dim);
  color:var(--blue);
  border:1px solid var(--blue);
}

.source-tag.manual{
  background:var(--green-dim);
  color:var(--green);
  border:1px solid var(--green);
}

.source-info{
  flex:1;
  min-width:0;
  overflow:hidden;
}

.source-name{
  font-family:var(--sans);
  font-size:0.85rem;
  color:#fff;
  font-weight:500;
  margin-bottom:2px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-url{
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-actions{flex-shrink:0}

/* Add form */
.add-form{
  display:flex;
  gap:10px;
  margin-bottom:8px;
}

.add-form input{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:10px 14px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  outline:none;
  transition:border-color 0.2s;
}

.add-form input:focus{border-color:var(--green)}
.add-form input::placeholder{color:var(--text-dim);opacity:0.6}
.add-form .name-input{max-width:160px}

@media(max-width:560px){
  .add-form{flex-wrap:wrap}
  .add-form .name-input{max-width:100%}
}

/* Status bar (header inline) */
.status-bar{
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:16px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--text-dim);
}

.status-indicator{
  display:flex;align-items:center;gap:6px;
  padding:4px 10px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:4px;
}

.status-dot{
  width:6px;height:6px;
  border-radius:50%;
  background:var(--green);
  box-shadow:0 0 6px var(--green-glow);
  animation:pulse 2s ease-in-out infinite;
}

.status-dot.offline{
  background:var(--red);
  box-shadow:0 0 6px var(--red-dim);
  animation:none;
}

/* Empty state */
.empty{
  text-align:center;
  padding:32px 16px;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--text-dim);
}

/* Toast */
.toast{
  position:fixed;
  bottom:24px;
  right:24px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:12px 20px;
  border-radius:4px;
  z-index:999;
  animation:fadeSlideUp 0.3s ease-out;
  transition:opacity 0.3s;
}

.toast.success{
  background:var(--green-dim);
  border:1px solid var(--green);
  color:var(--green);
}

.toast.error{
  background:var(--red-dim);
  border:1px solid var(--red);
  color:var(--red);
}

/* Collapsible */
.collapsible-toggle{
  font-family:var(--mono);
  font-size:0.65rem;
  letter-spacing:0.08em;
  color:var(--text-dim);
  cursor:pointer;
  padding:6px 0;
  user-select:none;
  transition:color 0.2s;
}

.collapsible-toggle:hover{color:var(--text)}

.collapsible-toggle::before{
  content:'\\25B6';
  display:inline-block;
  margin-right:6px;
  font-size:0.55rem;
  transition:transform 0.2s;
}

.collapsible-toggle.open::before{transform:rotate(90deg)}

.collapsible-body{
  display:none;
  margin-top:8px;
}

.collapsible-body.open{display:block}

/* Footer */
.footer{
  margin-top:36px;
  padding-top:20px;
  border-top:1px solid var(--border);
  font-family:var(--mono);
  font-size:0.65rem;
  color:var(--text-dim);
  text-align:center;
  letter-spacing:0.05em;
}

/* Loading skeleton */
.skeleton{
  background:linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
  border-radius:4px;
  color:transparent !important;
}

/* Animations */
@keyframes fadeSlideDown{
  from{opacity:0;transform:translateY(-12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes fadeSlideUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:0.4}
}

@keyframes loading{
  0%{width:0;left:0}
  50%{width:100%;left:0}
  100%{width:0;left:100%}
}

@keyframes shimmer{
  0%{background-position:200% 0}
  100%{background-position:-200% 0}
}
`;

// src/core/shared-ui.ts
var sharedUi = `
const $ = id => document.getElementById(id);

function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function getLang() {
  const s = localStorage.getItem('lang');
  if (s === 'en' || s === 'zh') return s;
  return navigator.language?.startsWith('zh') ? 'zh' : 'en';
}

function applyLang(translations, lang) {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    const v = translations[lang]?.[k];
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    const v = translations[lang]?.[k];
    if (v) el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-text]').forEach(el => {
    const k = el.dataset.i18nText;
    const v = translations[lang]?.[k];
    if (v) el.textContent = v;
  });
  const toggle = $('langToggle');
  if (toggle) toggle.textContent = lang === 'zh' ? 'EN' : '\u4E2D\u6587';
  document.body.style.opacity = '1';
}

function toast(msg, type) {
  type = type || 'success';
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 2500);
}

function initAuth(tokenInputId, errorId, overlayId, contentId, verifyUrl, onSuccess) {
  let token = '';
  const tokenInput = $(tokenInputId);
  const overlay = $(overlayId);
  const content = $(contentId);
  const errorEl = $(errorId);

  function getToken() { return token; }

  function authFetch(url, opts) {
    opts = opts || {};
    opts.headers = Object.assign({}, opts.headers, { 'Authorization': 'Bearer ' + token });
    return fetch(url, opts);
  }

  function doLogin() {
    token = tokenInput.value.trim();
    if (!token) return;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        sessionStorage.setItem('admin_token', token);
        onSuccess();
      } else {
        errorEl.style.display = 'block';
        tokenInput.value = '';
        tokenInput.focus();
      }
    }).catch(() => {
      errorEl.style.display = 'block';
    });
  }

  tokenInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  // Auto-login from session
  const saved = sessionStorage.getItem('admin_token');
  if (saved) {
    token = saved;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        onSuccess();
      }
    });
  }

  return { doLogin, authFetch, getToken };
}

function toggleCollapsible(toggleEl) {
  toggleEl.classList.toggle('open');
  const body = toggleEl.nextElementSibling;
  if (body) body.classList.toggle('open');
}
`;

// src/core/admin.ts
var adminHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Aggregator - Admin</title>
<style>
${sharedStyles}

/* Admin-specific: action bar in header */
.agg-bar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:16px;
  padding:12px 16px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:6px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--text-dim);
}

.agg-bar .status-text{font-family:var(--mono);font-size:0.75rem;color:var(--text-dim)}
.agg-bar .status-text.success{color:var(--green)}
.agg-bar .status-text.error{color:var(--red)}

/* Inline form label */
.form-label{
  font-family:var(--mono);
  font-size:0.65rem;
  color:var(--text-dim);
  text-transform:uppercase;
  letter-spacing:0.1em;
  display:block;
  margin-bottom:4px;
}

/* Name transform grid */
.nt-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-bottom:10px;
}

.nt-input{
  width:100%;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:8px 12px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  outline:none;
  transition:border-color 0.2s;
}

.nt-input:focus{border-color:var(--green)}

.nt-textarea{
  width:100%;
  min-height:60px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:8px 12px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  resize:vertical;
  outline:none;
}

.nt-textarea:focus{border-color:var(--green)}

/* Import textarea */
.import-textarea{
  width:100%;
  min-height:100px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:10px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  resize:vertical;
  margin-bottom:8px;
}

/* Batch textarea */
.batch-textarea{
  width:100%;
  margin-top:8px;
  min-height:120px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:10px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:#fff;
  resize:vertical;
}

@media(max-width:560px){
  .nt-grid{grid-template-columns:1fr}
  .tabs{overflow-x:auto;flex-wrap:nowrap}
  .tab{padding:12px 14px;font-size:0.65rem}
}
</style>
</head>
<body style="opacity:0">

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2 data-i18n="loginTitle">Admin Access</h2>
    <p data-i18n="loginSubtitle">TVBox Aggregator Management</p>
    <div class="error-msg" id="loginError" data-i18n="invalidToken">Invalid token</div>
    <input type="password" id="loginInput" placeholder="Enter admin token" data-i18n-placeholder="enterToken" autocomplete="off">
    <button class="btn" style="width:100%" onclick="auth.doLogin()" data-i18n="login">Login</button>
  </div>
</div>

<!-- Main content -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label" data-i18n="headerLabel">Admin Console</div>
      <button class="lang-toggle" id="langToggle" onclick="doToggleLang()">\u4E2D\u6587</button>
    </div>
    <h1 class="header-title">Source <span>Manager</span></h1>
    <nav class="header-nav">
      <a href="/admin/config-editor" data-i18n="navConfigEditor">Config Editor</a>
      <a href="/status" data-i18n="navDashboard">Dashboard</a>
    </nav>
    <!-- Aggregation status bar -->
    <div class="agg-bar">
      <span class="status-text" id="aggStatus" data-i18n="loadingStatus">Loading...</span>
      <button class="btn btn-sm" id="refreshBtn" onclick="triggerRefresh()" data-i18n="refresh">Refresh</button>
    </div>
  </header>

  <!-- Tabs -->
  <div class="tabs">
    <div class="tab active" data-tab="sources" onclick="switchTab('sources')"><span data-i18n="tabSources">Sources</span> <span class="badge" id="badgeSources">0</span></div>
    <div class="tab" data-tab="maccms" onclick="switchTab('maccms')"><span data-i18n="tabMacCMS">MacCMS</span> <span class="badge" id="badgeMacCMS">0</span></div>
    <div class="tab" data-tab="live" onclick="switchTab('live')"><span data-i18n="tabLive">Live</span> <span class="badge" id="badgeLive">0</span></div>
    <div class="tab" data-tab="settings" onclick="switchTab('settings')"><span data-i18n="tabSettings">Settings</span></div>
  </div>

  <!-- Sources Tab -->
  <div class="tab-panel active" id="panelSources">
    <!-- Add source -->
    <div class="section">
      <div class="section-title" data-i18n="addSource">Add Source</div>
      <div class="add-form">
        <input class="name-input" type="text" id="addName" placeholder="Name (optional)" data-i18n-placeholder="nameOptional">
        <input type="url" id="addUrl" placeholder="TVBox config JSON URL" data-i18n-placeholder="configJsonUrl">
        <input class="name-input" type="text" id="addConfigKey" placeholder="Config Key (optional, for AES ECB)">
        <button class="btn" id="addBtn" onclick="addSource()" data-i18n="add">Add</button>
      </div>
      <!-- Import (collapsible) -->
      <div class="collapsible-toggle" onclick="toggleCollapsible(this)" data-i18n="importConfig">Import Config</div>
      <div class="collapsible-body">
        <textarea id="importInput" class="import-textarea" placeholder="Paste TVBox JSON or URL here..." data-i18n-placeholder="importPlaceholder"></textarea>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn-sm" id="importBtn" onclick="importConfig()" data-i18n="import">Import</button>
          <span class="status-text" id="importResult" style="font-family:var(--mono);font-size:0.75rem"></span>
        </div>
      </div>
    </div>

    <!-- Source list -->
    <div class="section">
      <div class="section-title">
        <span data-i18n="sourcesList">Sources</span>
        <span class="count" id="sourceCount">0</span>
      </div>
      <div class="source-list" id="sourceList">
        <div class="empty">Loading sources...</div>
      </div>
    </div>
  </div>

  <!-- MacCMS Tab -->
  <div class="tab-panel" id="panelMaccms">
    <!-- Add MacCMS -->
    <div class="section">
      <div class="section-title" data-i18n="addMacCMS">Add MacCMS Source</div>
      <div class="add-form">
        <input class="name-input" type="text" id="mcKey" placeholder="Key (e.g. hongniuzy)" data-i18n-placeholder="mcKeyPh">
        <input class="name-input" type="text" id="mcName" placeholder="Name" data-i18n-placeholder="mcNamePh">
        <input type="url" id="mcApi" placeholder="MacCMS API URL" data-i18n-placeholder="mcApiPh">
        <button class="btn" id="mcAddBtn" onclick="addMacCMS()" data-i18n="add">Add</button>
      </div>
      <!-- Batch import (collapsible) -->
      <div class="collapsible-toggle" onclick="toggleCollapsible(this)" data-i18n="batchImport">Batch Import</div>
      <div class="collapsible-body">
        <textarea id="mcBatchInput" class="batch-textarea" placeholder='[{"key":"...","name":"...","api":"..."}]'></textarea>
        <button class="btn btn-sm" style="margin-top:8px" id="mcBatchBtn" onclick="batchImportMacCMS()" data-i18n="submitBatch">Submit Batch</button>
      </div>
    </div>

    <!-- MacCMS list -->
    <div class="section">
      <div class="section-title">
        <span data-i18n="macCMSSources">MacCMS Sources</span>
        <span class="count" id="mcCount">0</span>
      </div>
      <div class="source-list" id="mcList">
        <div class="empty">Loading MacCMS sources...</div>
      </div>
    </div>
  </div>

  <!-- Live Tab -->
  <div class="tab-panel" id="panelLive">
    <!-- Add live source -->
    <div class="section">
      <div class="section-title" data-i18n="addLiveSource">Add Live Source</div>
      <div class="add-form">
        <input class="name-input" type="text" id="liveName" placeholder="Name (e.g. iptv365)" data-i18n-placeholder="liveNamePh">
        <input type="url" id="liveUrl" placeholder="m3u/txt URL" data-i18n-placeholder="liveUrlPh">
        <button class="btn" id="liveAddBtn" onclick="addLive()" data-i18n="add">Add</button>
      </div>
    </div>

    <!-- Live list -->
    <div class="section">
      <div class="section-title">
        <span data-i18n="liveSources">Live Sources</span>
        <span class="count" id="liveCount">0</span>
      </div>
      <div class="source-list" id="liveList">
        <div class="empty">Loading live sources...</div>
      </div>
    </div>
  </div>

  <!-- Settings Tab -->
  <div class="tab-panel" id="panelSettings">
    <!-- Cron Interval -->
    <div class="section">
      <div class="section-title" data-i18n="cronInterval">Aggregation Schedule</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <select id="cronSelect" class="nt-input" style="width:auto;min-width:160px">
          <option value="60" data-i18n-text="cronEvery1h">Every 1 hour</option>
          <option value="180" data-i18n-text="cronEvery3h">Every 3 hours</option>
          <option value="360" data-i18n-text="cronEvery6h">Every 6 hours</option>
          <option value="720" data-i18n-text="cronEvery12h">Every 12 hours</option>
          <option value="1440" data-i18n-text="cronEveryDay">Once a day</option>
        </select>
        <button class="btn btn-sm" id="cronSaveBtn" onclick="saveCronInterval()" data-i18n="save">Save</button>
        <span class="status-text" id="cronStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title" data-i18n="nameTransform">Name Transform</div>
      <div class="nt-grid">
        <div>
          <label class="form-label" data-i18n="ntPrefix">Prefix</label>
          <input type="text" id="ntPrefix" class="nt-input" placeholder="e.g. \u3010RioTV\u3011" data-i18n-placeholder="ntPrefixPh">
        </div>
        <div>
          <label class="form-label" data-i18n="ntSuffix">Suffix</label>
          <input type="text" id="ntSuffix" class="nt-input" placeholder="e.g.  \xB7 Curated" data-i18n-placeholder="ntSuffixPh">
        </div>
      </div>
      <div style="margin-bottom:10px">
        <label class="form-label" data-i18n="ntPromoReplace">Promo Replacement (empty = delete)</label>
        <input type="text" id="ntPromoReplace" class="nt-input" placeholder="e.g. Premium" data-i18n-placeholder="ntPromoReplacePh">
      </div>
      <div style="margin-bottom:10px">
        <label class="form-label" data-i18n="ntExtraPatterns">Extra Clean Patterns (one regex per line)</label>
        <textarea id="ntExtraPatterns" class="nt-textarea" placeholder="e.g. sponsor[\uFF1A:]\\S+" data-i18n-placeholder="ntExtraPatternsPh"></textarea>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn" id="ntSaveBtn" onclick="saveNameTransform()" data-i18n="save">Save</button>
        <span class="status-text" id="ntStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
    </div>
  </div>

  <div class="footer">
    <span data-i18n="footer">TVBox Source Aggregator &middot; Admin Console</span>
  </div>
</div>

<script>
${sharedUi}

// --- i18n ---
const translations = {
  en: {
    loginTitle:'Admin Access', loginSubtitle:'TVBox Aggregator Management',
    invalidToken:'Invalid token', enterToken:'Enter admin token', login:'Login',
    connectionFailed:'Connection failed',
    headerLabel:'Admin Console', navConfigEditor:'Config Editor', navDashboard:'Dashboard',
    tabSources:'Sources', tabMacCMS:'MacCMS', tabLive:'Live', tabSettings:'Settings',
    addSource:'Add Source', aggregation:'Aggregation', sourcesList:'Sources',
    addMacCMS:'Add MacCMS Source', macCMSSources:'MacCMS Sources',
    addLiveSource:'Add Live Source', liveSources:'Live Sources',
    nameOptional:'Name (optional)', configJsonUrl:'TVBox config JSON URL',
    mcKeyPh:'Key (e.g. hongniuzy)', mcNamePh:'Name', mcApiPh:'MacCMS API URL',
    liveNamePh:'Name (e.g. iptv365)', liveUrlPh:'m3u/txt URL',
    add:'Add', adding:'Adding...', batchImport:'Batch Import',
    submitBatch:'Submit Batch',
    refresh:'Refresh', running:'Running...', remove:'Remove', test:'Test',
    loadingStatus:'Loading...',
    lastUpdate:'Last update: ', neverUpdated:'Never updated \u2014 click Refresh',
    failedLoadStatus:'Failed to load status',
    noSources:'No sources configured. Add one above.',
    noMacCMS:'No MacCMS sources. Add one above.',
    noLives:'No live sources. Add one above.',
    failedLoad:'Failed to load sources',
    failedLoadMacCMS:'Failed to load MacCMS sources',
    failedLoadLives:'Failed to load live sources',
    sourceAdded:'Source added', sourceRemoved:'Source removed',
    networkError:'Network error', testing:'Testing...',
    valid:'Valid', invalidUnreachable:'Invalid / Unreachable',
    liveSourceAdded:'Live source added', removed:'Removed',
    invalidJson:'Invalid JSON', mustBeArray:'Must be a JSON array',
    allFieldsRequired:'All fields required', importFailed:'Import failed',
    aggregationStarted:'Aggregation started', refreshFailed:'Refresh failed',
    importConfig:'Import Config', import:'Import', importing:'Importing...',
    importPlaceholder:'Paste TVBox JSON or URL here...',
    importMulti:'Multi-repo detected', importSingle:'Single config detected',
    importAdded:'added', importDuplicates:'duplicates', importParseFailed:'Failed to parse',
    nameTransform:'Name Transform', ntPrefix:'Prefix', ntSuffix:'Suffix',
    ntPromoReplace:'Promo Replacement (empty = delete)', ntExtraPatterns:'Extra Clean Patterns (one regex per line)',
    ntPrefixPh:'e.g. \u3010RioTV\u3011', ntSuffixPh:'e.g.  \xB7 Curated',
    ntPromoReplacePh:'e.g. Premium', ntExtraPatternsPh:'e.g. sponsor[\uFF1A:]\\\\S+',
    cronInterval:'Aggregation Schedule',
    cronEvery1h:'Every 1 hour', cronEvery3h:'Every 3 hours', cronEvery6h:'Every 6 hours',
    cronEvery12h:'Every 12 hours', cronEveryDay:'Once a day',
    save:'Save', saving:'Saving...', saved:'Saved', saveFailed:'Save failed',
    footer:'TVBox Source Aggregator &middot; Admin Console',
  },
  zh: {
    loginTitle:'\u7BA1\u7406\u767B\u5F55', loginSubtitle:'TVBox \u805A\u5408\u5668\u7BA1\u7406',
    invalidToken:'\u65E0\u6548\u7684\u4EE4\u724C', enterToken:'\u8BF7\u8F93\u5165\u7BA1\u7406\u4EE4\u724C', login:'\u767B\u5F55',
    connectionFailed:'\u8FDE\u63A5\u5931\u8D25',
    headerLabel:'\u7BA1\u7406\u63A7\u5236\u53F0', navConfigEditor:'\u914D\u7F6E\u7F16\u8F91', navDashboard:'\u4EEA\u8868\u76D8',
    tabSources:'\u6E90', tabMacCMS:'MacCMS', tabLive:'\u76F4\u64AD', tabSettings:'\u8BBE\u7F6E',
    addSource:'\u6DFB\u52A0\u6E90', aggregation:'\u805A\u5408', sourcesList:'\u6E90\u5217\u8868',
    addMacCMS:'\u6DFB\u52A0 MacCMS \u6E90', macCMSSources:'MacCMS \u6E90\u5217\u8868',
    addLiveSource:'\u6DFB\u52A0\u76F4\u64AD\u6E90', liveSources:'\u76F4\u64AD\u6E90\u5217\u8868',
    nameOptional:'\u540D\u79F0\uFF08\u53EF\u9009\uFF09', configJsonUrl:'TVBox \u914D\u7F6E JSON \u5730\u5740',
    mcKeyPh:'Key\uFF08\u5982 hongniuzy\uFF09', mcNamePh:'\u540D\u79F0', mcApiPh:'MacCMS API \u5730\u5740',
    liveNamePh:'\u540D\u79F0\uFF08\u5982 iptv365\uFF09', liveUrlPh:'m3u/txt \u5730\u5740',
    add:'\u6DFB\u52A0', adding:'\u6DFB\u52A0\u4E2D...', batchImport:'\u6279\u91CF\u5BFC\u5165',
    submitBatch:'\u63D0\u4EA4\u6279\u91CF',
    refresh:'\u5237\u65B0', running:'\u8FD0\u884C\u4E2D...', remove:'\u5220\u9664', test:'\u6D4B\u8BD5',
    loadingStatus:'\u52A0\u8F7D\u4E2D...',
    lastUpdate:'\u4E0A\u6B21\u66F4\u65B0: ', neverUpdated:'\u4ECE\u672A\u66F4\u65B0 \u2014 \u70B9\u51FB\u5237\u65B0',
    failedLoadStatus:'\u83B7\u53D6\u72B6\u6001\u5931\u8D25',
    noSources:'\u6682\u65E0\u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002',
    noMacCMS:'\u6682\u65E0 MacCMS \u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002',
    noLives:'\u6682\u65E0\u76F4\u64AD\u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002',
    failedLoad:'\u52A0\u8F7D\u6E90\u5931\u8D25',
    failedLoadMacCMS:'\u52A0\u8F7D MacCMS \u6E90\u5931\u8D25',
    failedLoadLives:'\u52A0\u8F7D\u76F4\u64AD\u6E90\u5931\u8D25',
    sourceAdded:'\u6E90\u5DF2\u6DFB\u52A0', sourceRemoved:'\u6E90\u5DF2\u5220\u9664',
    networkError:'\u7F51\u7EDC\u9519\u8BEF', testing:'\u6D4B\u8BD5\u4E2D...',
    valid:'\u6709\u6548', invalidUnreachable:'\u65E0\u6548/\u4E0D\u53EF\u8FBE',
    liveSourceAdded:'\u76F4\u64AD\u6E90\u5DF2\u6DFB\u52A0', removed:'\u5DF2\u5220\u9664',
    invalidJson:'\u65E0\u6548\u7684 JSON', mustBeArray:'\u5FC5\u987B\u662F JSON \u6570\u7EC4',
    allFieldsRequired:'\u6240\u6709\u5B57\u6BB5\u5FC5\u586B', importFailed:'\u5BFC\u5165\u5931\u8D25',
    aggregationStarted:'\u805A\u5408\u5DF2\u5F00\u59CB', refreshFailed:'\u5237\u65B0\u5931\u8D25',
    importConfig:'\u5BFC\u5165\u914D\u7F6E', import:'\u5BFC\u5165', importing:'\u5BFC\u5165\u4E2D...',
    importPlaceholder:'\u7C98\u8D34 TVBox JSON \u5185\u5BB9\u6216 URL...',
    importMulti:'\u68C0\u6D4B\u5230\u591A\u4ED3', importSingle:'\u68C0\u6D4B\u5230\u5355\u4ED3',
    importAdded:'\u5DF2\u6DFB\u52A0', importDuplicates:'\u91CD\u590D\u8DF3\u8FC7', importParseFailed:'\u89E3\u6790\u5931\u8D25',
    nameTransform:'\u540D\u79F0\u5B9A\u5236', ntPrefix:'\u524D\u7F00', ntSuffix:'\u540E\u7F00',
    ntPromoReplace:'\u63A8\u5E7F\u66FF\u6362\u6587\u5B57\uFF08\u7559\u7A7A\u5219\u5220\u9664\uFF09', ntExtraPatterns:'\u989D\u5916\u6E05\u6D17\u6B63\u5219\uFF08\u6BCF\u884C\u4E00\u6761\uFF09',
    ntPrefixPh:'\u5982 \u3010RioTV\u3011', ntSuffixPh:'\u5982  \xB7 \u7CBE\u9009',
    ntPromoReplacePh:'\u5982 \u7CBE\u9009\u63A8\u8350', ntExtraPatternsPh:'\u5982 sponsor[\uFF1A:]\\\\S+',
    cronInterval:'\u805A\u5408\u9891\u7387',
    cronEvery1h:'\u6BCF 1 \u5C0F\u65F6', cronEvery3h:'\u6BCF 3 \u5C0F\u65F6', cronEvery6h:'\u6BCF 6 \u5C0F\u65F6',
    cronEvery12h:'\u6BCF 12 \u5C0F\u65F6', cronEveryDay:'\u6BCF\u5929\u4E00\u6B21',
    save:'\u4FDD\u5B58', saving:'\u4FDD\u5B58\u4E2D...', saved:'\u5DF2\u4FDD\u5B58', saveFailed:'\u4FDD\u5B58\u5931\u8D25',
    footer:'TVBox \u6E90\u805A\u5408\u5668 &middot; \u7BA1\u7406\u63A7\u5236\u53F0',
  }
};

function t(key) { const l = getLang(); return translations[l]?.[key] || translations.en[key] || key; }

function doToggleLang() {
  const next = getLang() === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', next);
  applyLang(translations, next);
  loadAll();
}

// --- Auth ---
const auth = initAuth('loginInput', 'loginError', 'loginOverlay', 'mainContent', '/admin/sources', loadAll);

// --- Tab switching ---
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => {
    const id = 'panel' + tab.charAt(0).toUpperCase() + tab.slice(1);
    p.classList.toggle('active', p.id === id);
  });
}

// --- Load data ---
function loadAll() {
  loadSources();
  loadMacCMS();
  loadLives();
  loadStatus();
  loadNameTransform();
  loadCronInterval();
}

async function loadStatus() {
  try {
    const res = await fetch('/status-data');
    const d = await res.json();
    if (d.lastUpdate && d.lastUpdate !== 'never') {
      const date = new Date(d.lastUpdate);
      const fmt = date.toLocaleString('zh-CN', {
        year:'numeric', month:'2-digit', day:'2-digit',
        hour:'2-digit', minute:'2-digit', second:'2-digit',
        hour12: false
      });
      $('aggStatus').textContent = t('lastUpdate') + fmt + ' | ' + d.sites + ' sites, ' + d.parses + ' parses, ' + d.lives + ' lives' + (d.liveSourceCount ? ', ' + d.liveSourceCount + ' live sources' : '');
      $('aggStatus').className = 'status-text';
    } else {
      $('aggStatus').textContent = t('neverUpdated');
      $('aggStatus').className = 'status-text error';
    }
  } catch {
    $('aggStatus').textContent = t('failedLoadStatus');
    $('aggStatus').className = 'status-text error';
  }
}

async function loadSources() {
  const list = $('sourceList');
  try {
    const res = await auth.authFetch('/admin/sources');
    const sources = await res.json();
    $('sourceCount').textContent = sources.length;
    $('badgeSources').textContent = sources.length;

    if (sources.length === 0) {
      list.innerHTML = '<div class="empty">' + t('noSources') + '</div>';
      return;
    }

    list.innerHTML = sources.map(s => \`
      <div class="source-item">
        <div class="source-info">
          <div class="source-name">\${esc(s.name || 'Unnamed')}\${s.configKey ? ' \u{1F511}' : ''}</div>
          <div class="source-url">\${esc(s.url)}</div>
        </div>
        <div class="source-actions">
          <button class="btn btn-sm btn-danger" onclick="removeSource('\${esc(s.url)}')">\${t('remove')}</button>
        </div>
      </div>
    \`).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + t('failedLoad') + '</div>';
  }
}

// --- Add source ---
async function addSource() {
  const url = $('addUrl').value.trim();
  if (!url) { $('addUrl').focus(); return; }
  const name = $('addName').value.trim() || '';
  const configKey = $('addConfigKey').value.trim() || '';

  const btn = $('addBtn');
  btn.textContent = t('adding');
  btn.className = 'btn loading';

  try {
    const payload = { name, url };
    if (configKey) payload.configKey = configKey;
    const res = await auth.authFetch('/admin/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const d = await res.json();
    if (res.ok) {
      toast(t('sourceAdded'));
      $('addUrl').value = '';
      $('addName').value = '';
      $('addConfigKey').value = '';
      loadSources();
    } else {
      toast(d.error || t('failedLoad'), 'error');
    }
  } catch {
    toast(t('networkError'), 'error');
  }

  btn.textContent = t('add');
  btn.className = 'btn';
}

// --- Remove source ---
async function removeSource(url) {
  try {
    const res = await auth.authFetch('/admin/sources', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (res.ok) {
      toast(t('sourceRemoved'));
      loadSources();
    } else {
      const d = await res.json();
      toast(d.error || t('remove'), 'error');
    }
  } catch {
    toast(t('networkError'), 'error');
  }
}

// --- MacCMS ---
async function loadMacCMS() {
  const list = $('mcList');
  try {
    const res = await auth.authFetch('/admin/maccms');
    const sources = await res.json();
    $('mcCount').textContent = sources.length;
    $('badgeMacCMS').textContent = sources.length;

    if (sources.length === 0) {
      list.innerHTML = '<div class="empty">' + t('noMacCMS') + '</div>';
      return;
    }

    list.innerHTML = sources.map(s => \`
      <div class="source-item">
        <span class="source-tag manual">\${esc(s.key)}</span>
        <div class="source-info">
          <div class="source-name">\${esc(s.name)}</div>
          <div class="source-url">\${esc(s.api)}</div>
        </div>
        <div class="source-actions" style="display:flex;gap:6px">
          <button class="btn btn-sm" onclick="validateMC('\${esc(s.api)}')">\${t('test')}</button>
          <button class="btn btn-sm btn-danger" onclick="removeMC('\${esc(s.key)}')">\${t('remove')}</button>
        </div>
      </div>
    \`).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + t('failedLoadMacCMS') + '</div>';
  }
}

async function addMacCMS() {
  const key = $('mcKey').value.trim();
  const name = $('mcName').value.trim();
  const api = $('mcApi').value.trim();
  if (!key || !name || !api) { toast(t('allFieldsRequired'), 'error'); return; }

  const btn = $('mcAddBtn');
  btn.textContent = t('adding');
  btn.className = 'btn loading';

  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, name, api })
    });
    const d = await res.json();
    if (res.ok) {
      toast('Added ' + (d.added || 1) + ' MacCMS source(s)');
      $('mcKey').value = '';
      $('mcName').value = '';
      $('mcApi').value = '';
      loadMacCMS();
    } else {
      toast(d.error || 'Failed', 'error');
    }
  } catch { toast(t('networkError'), 'error'); }

  btn.textContent = t('add');
  btn.className = 'btn';
}

async function removeMC(key) {
  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    if (res.ok) { toast('Removed'); loadMacCMS(); }
    else { const d = await res.json(); toast(d.error || 'Failed', 'error'); }
  } catch { toast(t('networkError'), 'error'); }
}

async function validateMC(api) {
  toast(t('testing'));
  try {
    const res = await auth.authFetch('/admin/maccms/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api })
    });
    const d = await res.json();
    toast(d.valid ? t('valid') : t('invalidUnreachable'), d.valid ? 'success' : 'error');
  } catch { toast(t('networkError'), 'error'); }
}

async function batchImportMacCMS() {
  const raw = $('mcBatchInput').value.trim();
  if (!raw) return;
  let data;
  try { data = JSON.parse(raw); } catch { toast(t('invalidJson'), 'error'); return; }
  if (!Array.isArray(data)) { toast(t('mustBeArray'), 'error'); return; }

  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const d = await res.json();
    if (res.ok) {
      toast('Imported ' + (d.added || 0) + ' source(s)');
      $('mcBatchInput').value = '';
      loadMacCMS();
    } else {
      toast(d.error || t('importFailed'), 'error');
    }
  } catch { toast(t('networkError'), 'error'); }
}

// --- Live Sources ---
async function loadLives() {
  const list = $('liveList');
  try {
    const res = await auth.authFetch('/admin/lives');
    const entries = await res.json();
    $('liveCount').textContent = entries.length;
    $('badgeLive').textContent = entries.length;

    if (entries.length === 0) {
      list.innerHTML = '<div class="empty">' + t('noLives') + '</div>';
      return;
    }

    list.innerHTML = entries.map(s => \`
      <div class="source-item">
        <span class="source-tag manual">LIVE</span>
        <div class="source-info">
          <div class="source-name">\${esc(s.name || 'Unnamed')}</div>
          <div class="source-url">\${esc(s.url)}</div>
        </div>
        <div class="source-actions">
          <button class="btn btn-sm btn-danger" onclick="removeLive('\${esc(s.url)}')">\${t('remove')}</button>
        </div>
      </div>
    \`).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + t('failedLoadLives') + '</div>';
  }
}

async function addLive() {
  const url = $('liveUrl').value.trim();
  if (!url) { $('liveUrl').focus(); return; }
  const name = $('liveName').value.trim() || '';

  const btn = $('liveAddBtn');
  btn.textContent = t('adding');
  btn.className = 'btn loading';

  try {
    const res = await auth.authFetch('/admin/lives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url })
    });
    const d = await res.json();
    if (res.ok) {
      toast(t('liveSourceAdded'));
      $('liveUrl').value = '';
      $('liveName').value = '';
      loadLives();
    } else {
      toast(d.error || 'Failed to add', 'error');
    }
  } catch {
    toast(t('networkError'), 'error');
  }

  btn.textContent = t('add');
  btn.className = 'btn';
}

async function removeLive(url) {
  try {
    const res = await auth.authFetch('/admin/lives', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (res.ok) { toast(t('removed')); loadLives(); }
    else { const d = await res.json(); toast(d.error || 'Failed', 'error'); }
  } catch { toast(t('networkError'), 'error'); }
}

// --- Import Config ---
async function importConfig() {
  const input = $('importInput').value.trim();
  if (!input) { $('importInput').focus(); return; }

  const btn = $('importBtn');
  const result = $('importResult');
  btn.textContent = t('importing');
  btn.className = 'btn btn-sm loading';
  result.textContent = '';

  try {
    const res = await auth.authFetch('/admin/sources/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const d = await res.json();
    if (res.ok) {
      const typeLabel = d.type === 'multi' ? t('importMulti') : t('importSingle');
      result.textContent = typeLabel + ': ' + d.added + ' ' + t('importAdded') + (d.duplicates > 0 ? ', ' + d.duplicates + ' ' + t('importDuplicates') : '');
      result.className = 'status-text success';
      if (d.added > 0) {
        $('importInput').value = '';
        loadSources();
      }
    } else {
      result.textContent = d.error || t('importParseFailed');
      result.className = 'status-text error';
    }
  } catch {
    result.textContent = t('networkError');
    result.className = 'status-text error';
  }

  btn.textContent = t('import');
  btn.className = 'btn btn-sm';
}

// --- Name Transform ---
async function loadNameTransform() {
  try {
    const res = await auth.authFetch('/admin/name-transform');
    if (!res.ok) return;
    const d = await res.json();
    $('ntPrefix').value = d.prefix || '';
    $('ntSuffix').value = d.suffix || '';
    $('ntPromoReplace').value = d.promoReplacement || '';
    $('ntExtraPatterns').value = (d.extraCleanPatterns || []).join('\\n');
  } catch {}
}

async function saveNameTransform() {
  const btn = $('ntSaveBtn');
  const status = $('ntStatus');
  btn.textContent = t('saving');
  btn.className = 'btn loading';
  status.textContent = '';

  const extraRaw = $('ntExtraPatterns').value.trim();
  const extraCleanPatterns = extraRaw ? extraRaw.split('\\n').map(s => s.trim()).filter(Boolean) : [];

  try {
    const res = await auth.authFetch('/admin/name-transform', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prefix: $('ntPrefix').value || '',
        suffix: $('ntSuffix').value || '',
        promoReplacement: $('ntPromoReplace').value || '',
        extraCleanPatterns
      })
    });
    const d = await res.json();
    if (res.ok) {
      status.textContent = t('saved');
      status.className = 'status-text success';
    } else {
      status.textContent = d.error || t('saveFailed');
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = t('networkError');
    status.className = 'status-text error';
  }

  btn.textContent = t('save');
  btn.className = 'btn';
  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Cron Interval ---
async function loadCronInterval() {
  try {
    const res = await auth.authFetch('/admin/cron-interval');
    if (!res.ok) return;
    const d = await res.json();
    $('cronSelect').value = String(d.interval || 1440);
  } catch {}
}

async function saveCronInterval() {
  const btn = $('cronSaveBtn');
  const status = $('cronStatus');
  btn.textContent = t('saving');
  btn.className = 'btn btn-sm loading';
  status.textContent = '';

  try {
    const res = await auth.authFetch('/admin/cron-interval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interval: parseInt($('cronSelect').value) })
    });
    const d = await res.json();
    if (res.ok) {
      status.textContent = t('saved');
      status.className = 'status-text success';
    } else {
      status.textContent = d.error || t('saveFailed');
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = t('networkError');
    status.className = 'status-text error';
  }

  btn.textContent = t('save');
  btn.className = 'btn btn-sm';
  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Refresh ---
async function triggerRefresh() {
  const btn = $('refreshBtn');
  btn.textContent = t('running');
  btn.className = 'btn btn-sm loading';

  try {
    const res = await auth.authFetch('/refresh', { method: 'POST' });
    const d = await res.json();
    if (d.success) {
      toast(t('aggregationStarted'));
      setTimeout(loadStatus, 3000);
    } else {
      toast(t('refreshFailed'), 'error');
    }
  } catch {
    toast(t('networkError'), 'error');
  }

  setTimeout(() => {
    btn.textContent = t('refresh');
    btn.className = 'btn btn-sm';
  }, 3000);
}

applyLang(translations, getLang());
</script>
</body>
</html>`;

// src/core/dashboard.ts
var dashboardHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Source Aggregator</title>
<style>
${sharedStyles}

/* Dashboard-specific */
.header{margin-bottom:48px}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:16px;
  margin-bottom:32px;
}

@media(max-width:560px){
  .stats-grid{grid-template-columns:1fr}
}

.stat-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  position:relative;
  overflow:hidden;
  transition:border-color 0.3s, transform 0.2s;
  animation:fadeSlideUp 0.5s ease-out both;
}

.stat-card:nth-child(1){animation-delay:0.1s}
.stat-card:nth-child(2){animation-delay:0.15s}
.stat-card:nth-child(3){animation-delay:0.2s}
.stat-card:nth-child(4){animation-delay:0.25s}

.stat-card:hover{
  border-color:var(--border-glow);
  transform:translateY(-2px);
}

.stat-card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.stat-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:12px;
  display:flex;
  align-items:center;
  gap:6px;
}

.stat-icon{
  width:14px;height:14px;
  opacity:0.5;
}

.stat-value{
  font-family:var(--mono);
  font-size:2.2rem;
  font-weight:700;
  color:#fff;
  line-height:1;
  letter-spacing:-0.02em;
}

.stat-value .unit{
  font-size:0.8rem;
  font-weight:400;
  color:var(--text-dim);
  margin-left:4px;
}

.stat-card.highlight .stat-value{
  color:var(--green);
  text-shadow:0 0 20px var(--green-dim);
}

/* Update time section */
.update-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:32px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  animation:fadeSlideUp 0.5s ease-out 0.3s both;
}

@media(max-width:560px){
  .update-section{flex-direction:column;align-items:flex-start}
}

.update-info{
  display:flex;flex-direction:column;gap:4px;
}

.update-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
}

.update-time{
  font-family:var(--mono);
  font-size:0.95rem;
  color:#fff;
  font-weight:500;
}

.update-time.stale{color:var(--amber)}
.update-time.never{color:var(--red)}

/* Refresh button */
.refresh-btn{
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:600;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:10px 24px;
  background:transparent;
  border:1px solid var(--green);
  color:var(--green);
  border-radius:4px;
  cursor:pointer;
  position:relative;
  overflow:hidden;
  transition:all 0.3s;
  white-space:nowrap;
}

.refresh-btn:hover{
  background:var(--green-dim);
  box-shadow:0 0 20px var(--green-dim);
}

.refresh-btn:active{transform:scale(0.97)}

.refresh-btn.loading{
  color:var(--amber);
  border-color:var(--amber);
  pointer-events:none;
}

.refresh-btn.loading::after{
  content:'';
  position:absolute;
  bottom:0;left:0;
  height:2px;
  background:var(--amber);
  animation:loading 2s linear infinite;
}

.refresh-btn.success{
  color:var(--green);
  border-color:var(--green);
  background:var(--green-dim);
}

.refresh-btn.error{
  color:var(--red);
  border-color:var(--red);
  background:var(--red-dim);
}

/* Config URL section */
.config-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  animation:fadeSlideUp 0.5s ease-out 0.35s both;
}

.config-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:10px;
}

.config-url-row{
  display:flex;
  align-items:center;
  gap:10px;
}

.config-url{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--green);
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  padding:10px 14px;
  overflow-x:auto;
  white-space:nowrap;
  user-select:all;
}

.copy-btn{
  font-family:var(--mono);
  font-size:0.7rem;
  font-weight:500;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:10px 16px;
  background:var(--surface-2);
  border:1px solid var(--border);
  color:var(--text-dim);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.2s;
  white-space:nowrap;
}

.copy-btn:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

.copy-btn.copied{
  color:var(--green);
  border-color:var(--green);
}

.footer{margin-top:48px;padding-top:24px}
</style>
</head>
<body style="opacity:0">

<div class="container">
  <header class="header">
    <div class="header-top">
      <div class="header-label" data-i18n="headerLabel">System Monitor</div>
      <button class="lang-toggle" id="langToggle" onclick="doToggleLang()">\u4E2D\u6587</button>
    </div>
    <h1 class="header-title">TVBox <span>Aggregator</span></h1>
    <div class="status-bar">
      <div class="status-indicator">
        <span class="status-dot" id="statusDot"></span>
        <span id="statusText" data-i18n="connecting">Connecting...</span>
      </div>
    </div>
    <nav class="header-nav">
      <a href="/admin" data-i18n="navAdmin">Admin</a>
      <a href="/admin/config-editor" data-i18n="navConfigEditor">Config Editor</a>
    </nav>
  </header>

  <div class="stats-grid">
    <div class="stat-card highlight">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span data-i18n="sites">Sites</span>
      </div>
      <div class="stat-value" id="statSites"><span class="skeleton">&nbsp;000&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <span data-i18n="lives">Lives</span>
      </div>
      <div class="stat-value" id="statLives"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span data-i18n="parses">Parses</span>
      </div>
      <div class="stat-value" id="statParses"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
        <span data-i18n="sources">Sources</span>
      </div>
      <div class="stat-value" id="statSources"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
  </div>

  <div class="update-section">
    <div class="update-info">
      <div class="update-label" data-i18n="lastAggregation">Last Aggregation</div>
      <div class="update-time" id="updateTime"><span class="skeleton">&nbsp;Loading...&nbsp;</span></div>
    </div>
    <button class="refresh-btn" id="refreshBtn" onclick="triggerRefresh()" data-i18n="refresh">
      Refresh
    </button>
  </div>

  <div class="config-section">
    <div class="config-label" data-i18n="configUrlLabel">TVBox Config URL</div>
    <div class="config-url-row">
      <div class="config-url" id="configUrl"></div>
      <button class="copy-btn" id="copyBtn" onclick="copyUrl('configUrl')" data-i18n="copy">Copy</button>
    </div>
    <div style="margin-top:12px">
      <div class="config-label" data-i18n="liveConfigUrlLabel">Live-Only Config URL</div>
      <div class="config-url-row">
        <div class="config-url" id="liveConfigUrl"></div>
        <button class="copy-btn" id="copyLiveBtn" onclick="copyUrl('liveConfigUrl')" data-i18n="copy">Copy</button>
      </div>
    </div>
  </div>

  <div class="footer">
    <span data-i18n="footer">TVBox Source Aggregator &middot; Cron 05:00 UTC Daily</span>
  </div>
</div>

<script>
${sharedUi}

const translations = {
  en: {
    headerLabel:'System Monitor', connecting:'Connecting...', sites:'Sites', lives:'Lives',
    parses:'Parses', sources:'Sources', lastAggregation:'Last Aggregation', refresh:'Refresh',
    refreshing:'Refreshing...', done:'Done', failed:'Failed', error:'Error',
    configUrlLabel:'TVBox Config URL', liveConfigUrlLabel:'Live-Only Config URL',
    copy:'Copy', copied:'Copied!', neverRefresh:'Never \u2014 trigger a refresh',
    fetchError:'Failed to fetch status', noData:'No data',
    footer:'TVBox Source Aggregator &middot; Cron 05:00 UTC Daily',
    navAdmin:'Admin', navConfigEditor:'Config Editor',
  },
  zh: {
    headerLabel:'\u7CFB\u7EDF\u76D1\u63A7', connecting:'\u8FDE\u63A5\u4E2D...', sites:'\u7AD9\u70B9', lives:'\u76F4\u64AD',
    parses:'\u89E3\u6790', sources:'\u6E90', lastAggregation:'\u4E0A\u6B21\u805A\u5408', refresh:'\u5237\u65B0',
    refreshing:'\u5237\u65B0\u4E2D...', done:'\u5B8C\u6210', failed:'\u5931\u8D25', error:'\u9519\u8BEF',
    configUrlLabel:'TVBox \u914D\u7F6E\u5730\u5740', liveConfigUrlLabel:'\u76F4\u64AD\u914D\u7F6E\u5730\u5740',
    copy:'\u590D\u5236', copied:'\u5DF2\u590D\u5236!', neverRefresh:'\u4ECE\u672A\u66F4\u65B0 \u2014 \u70B9\u51FB\u5237\u65B0',
    fetchError:'\u83B7\u53D6\u72B6\u6001\u5931\u8D25', noData:'\u65E0\u6570\u636E',
    footer:'TVBox \u6E90\u805A\u5408\u5668 &middot; \u6BCF\u65E5 UTC 05:00 \u5B9A\u65F6\u4EFB\u52A1',
    navAdmin:'\u7BA1\u7406', navConfigEditor:'\u914D\u7F6E\u7F16\u8F91',
  }
};

function t(key) { const l = getLang(); return translations[l]?.[key] || translations.en[key] || key; }

function doToggleLang() {
  const next = getLang() === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', next);
  applyLang(translations, next);
  loadStatus();
}

const configUrl = location.origin + '/';
$('configUrl').textContent = configUrl;
$('liveConfigUrl').textContent = location.origin + '/live-config';

async function loadStatus() {
  try {
    const res = await fetch('/status-data');
    const d = await res.json();

    $('statSites').textContent = d.sites ?? '\u2014';
    $('statLives').textContent = d.lives ?? '\u2014';
    $('statParses').textContent = d.parses ?? '\u2014';
    $('statSources').textContent = d.sourceCount ?? '\u2014';

    const dot = $('statusDot');
    const txt = $('statusText');
    const time = $('updateTime');

    if (d.lastUpdate && d.lastUpdate !== 'never') {
      const date = new Date(d.lastUpdate);
      const now = new Date();
      const diffH = (now - date) / 3.6e6;
      const fmt = date.toLocaleString('zh-CN', {
        year:'numeric', month:'2-digit', day:'2-digit',
        hour:'2-digit', minute:'2-digit', second:'2-digit',
        hour12: false
      });

      time.textContent = fmt;
      time.className = 'update-time' + (diffH > 26 ? ' stale' : '');

      dot.className = 'status-dot';
      txt.textContent = 'Online \xB7 ' + d.sites + ' ' + t('sites').toLowerCase();
    } else {
      time.textContent = t('neverRefresh');
      time.className = 'update-time never';
      dot.className = 'status-dot offline';
      txt.textContent = t('noData');
    }
  } catch (e) {
    $('statusDot').className = 'status-dot offline';
    $('statusText').textContent = t('error');
    $('updateTime').textContent = t('fetchError');
    $('updateTime').className = 'update-time never';
  }
}

async function triggerRefresh() {
  const btn = $('refreshBtn');
  btn.textContent = t('refreshing');
  btn.className = 'refresh-btn loading';

  try {
    const res = await fetch('/refresh', { method: 'POST' });
    const d = await res.json();
    if (d.success) {
      btn.textContent = t('done');
      btn.className = 'refresh-btn success';
      setTimeout(() => loadStatus(), 500);
    } else {
      btn.textContent = t('failed');
      btn.className = 'refresh-btn error';
    }
  } catch {
    btn.textContent = t('error');
    btn.className = 'refresh-btn error';
  }

  setTimeout(() => {
    btn.textContent = t('refresh');
    btn.className = 'refresh-btn';
  }, 3000);
}

function copyUrl(elementId) {
  const text = $(elementId).textContent;
  const btn = $(elementId).parentElement.querySelector('.copy-btn');
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = t('copied');
    btn.className = 'copy-btn copied';
    setTimeout(() => {
      btn.textContent = t('copy');
      btn.className = 'copy-btn';
    }, 2000);
  });
}

applyLang(translations, getLang());
loadStatus();
setInterval(loadStatus, 60000);
</script>
</body>
</html>`;

// src/core/config-editor.ts
var configEditorHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Aggregator - Config Editor</title>
<style>
${sharedStyles}

/* Config Editor specific */
.container{max-width:960px}

/* Group */
.group{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  margin-bottom:12px;
  overflow:hidden;
}

.group-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 16px;
  cursor:pointer;
  user-select:none;
  transition:background 0.2s;
}

.group-header:hover{background:var(--surface-2)}

.group-title{
  font-family:var(--mono);
  font-size:0.8rem;
  font-weight:600;
  color:#fff;
  display:flex;
  align-items:center;
  gap:8px;
}

.group-title .count{
  font-size:0.65rem;
  font-weight:400;
  color:var(--text-dim);
  padding:2px 8px;
  background:var(--surface-2);
  border-radius:10px;
}

.group-arrow{
  font-size:0.7rem;
  color:var(--text-dim);
  transition:transform 0.2s;
}

.group.open .group-arrow{transform:rotate(90deg)}

.group-body{
  display:none;
  border-top:1px solid var(--border);
}

.group.open .group-body{display:block}

/* Item row */
.item{
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 16px;
  border-bottom:1px solid var(--border);
  transition:background 0.15s;
  font-family:var(--mono);
  font-size:0.75rem;
}

.item:last-child{border-bottom:none}
.item:hover{background:var(--surface-2)}

.item.blocked{opacity:0.4}

.item-name{
  flex:1;
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:#fff;
  font-weight:500;
}

.item.blocked .item-name{
  text-decoration:line-through;
  color:var(--text-dim);
}

.item-type{
  position:relative;
  font-size:0.6rem;
  padding:2px 8px;
  border-radius:4px;
  font-weight:600;
  letter-spacing:0.05em;
  text-transform:uppercase;
  cursor:help;
  white-space:nowrap;
}

.item-type.t0{background:var(--blue-dim);color:var(--blue)}
.item-type.t1{background:var(--green-dim);color:var(--green)}
.item-type.t3{background:var(--amber-dim);color:var(--amber)}
.item-type.t4{background:var(--red-dim);color:var(--red)}

/* Tooltip */
.tooltip{
  position:absolute;
  bottom:calc(100% + 8px);
  left:50%;
  transform:translateX(-50%);
  background:var(--surface);
  border:1px solid var(--border-glow);
  border-radius:6px;
  padding:8px 12px;
  font-family:var(--sans);
  font-size:0.75rem;
  font-weight:400;
  color:var(--text);
  white-space:nowrap;
  pointer-events:none;
  opacity:0;
  transition:opacity 0.15s;
  z-index:100;
  text-transform:none;
  letter-spacing:0;
  box-shadow:0 4px 12px rgba(0,0,0,0.3);
}

.tooltip::after{
  content:'';
  position:absolute;
  top:100%;
  left:50%;
  transform:translateX(-50%);
  border:5px solid transparent;
  border-top-color:var(--border-glow);
}

.item-type:hover .tooltip{opacity:1}

.item-api{
  max-width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:var(--text-dim);
  font-size:0.65rem;
}

.item-actions{
  display:flex;
  gap:6px;
  flex-shrink:0;
}

/* Flat list (for parses / lives) */
.flat-list{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  overflow:hidden;
}

/* Stats bar */
.stats{
  display:flex;
  gap:16px;
  margin-bottom:20px;
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
}

.stats .stat{
  display:flex;
  align-items:center;
  gap:4px;
}

.stats .num{
  color:var(--green);
  font-weight:600;
}

.stats .blocked-num{
  color:var(--red);
  font-weight:600;
}

/* Loading */
.loading-msg{
  text-align:center;
  padding:60px 20px;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--text-dim);
}

.footer{margin-top:48px;padding-top:24px}
</style>
</head>
<body style="opacity:0">

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2 data-i18n="loginTitle">Config Editor</h2>
    <p data-i18n="loginSubtitle">Enter admin token</p>
    <div class="error-msg" id="loginError" data-i18n="invalidToken">Invalid token</div>
    <input type="password" id="tokenInput" data-i18n-placeholder="tokenPh" placeholder="Admin Token" autofocus>
    <button class="btn" style="width:100%" data-i18n="login" onclick="auth.doLogin()">Login</button>
  </div>
</div>

<!-- Main -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label" data-i18n="headerLabel">Config Editor</div>
      <button class="lang-toggle" id="langToggle" onclick="doToggleLang()">EN</button>
    </div>
    <h1 class="header-title">TVBox <span>Config</span></h1>
    <div class="header-nav">
      <a href="/admin" data-i18n="navAdmin">Admin</a>
      <a href="/status" data-i18n="navDashboard">Dashboard</a>
    </div>
  </header>

  <!-- Tabs -->
  <div class="tabs">
    <div class="tab active" data-tab="sites" onclick="switchTab('sites')">Sites <span class="badge" id="badgeSites">0</span></div>
    <div class="tab" data-tab="parses" onclick="switchTab('parses')">Parses <span class="badge" id="badgeParses">0</span></div>
    <div class="tab" data-tab="lives" onclick="switchTab('lives')">Lives <span class="badge" id="badgeLives">0</span></div>
  </div>

  <!-- Search -->
  <div class="search-bar">
    <input type="text" id="searchInput" data-i18n-placeholder="searchPh" placeholder="\u641C\u7D22\u540D\u79F0\u3001API\u3001URL..." oninput="doSearch()">
  </div>

  <!-- Stats -->
  <div class="stats" id="statsBar"></div>

  <!-- Sites panel -->
  <div class="tab-panel active" id="panelSites">
    <div class="loading-msg" id="loadingSites" data-i18n="loading">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <!-- Parses panel -->
  <div class="tab-panel" id="panelParses">
    <div class="loading-msg" id="loadingParses" data-i18n="loading">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <!-- Lives panel -->
  <div class="tab-panel" id="panelLives">
    <div class="loading-msg" id="loadingLives" data-i18n="loading">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <div class="footer">
    <span data-i18n="footer">TVBox Config Editor &middot; Blacklisted items are excluded from aggregated output</span>
  </div>
</div>

<script>
${sharedUi}

// --- i18n ---
const _translations = {
  en: {
    loginTitle:'Config Editor', loginSubtitle:'Enter admin token',
    invalidToken:'Invalid token', tokenPh:'Admin Token', login:'Login',
    networkError:'Network error',
    headerLabel:'Config Editor', navAdmin:'Admin', navConfigEditor:'Config Editor', navDashboard:'Dashboard',
    searchPh:'Search name, API, URL...', loading:'Loading...',
    available:'Available:', blocked:'Blocked:',
    sites:'sites', parses:'parses', lives:'lives',
    restore:'Restore', block:'Block',
    groupOther:'Other', groupRemotePrefix:'Remote: ', groupRemote:'Remote',
    siteType0:'XML site: fetches video data via XML API',
    siteType1:'JSON site (MacCMS): fetches video data via JSON API',
    siteType3:'JAR plugin: fetches data via Java spider plugin, requires spider package',
    siteType4:'Remote site: uses remotely configured site',
    parseType0:'Sniffer parse: extracts video URL by sniffing web pages',
    parseType1:'JSON parse: returns video URL in JSON format directly',
    parseType2:'JSON extended parse: JSON parse with extra parameters',
    parseType3:'Aggregated parse: combines results from multiple parsers',
    parseType4:'Super parse: advanced composite parse mode',
    liveType0:'Live source: M3U/TXT format channel list file',
    liveType3:'Live plugin: fetches channels via JAR/Python plugin',
    typePrefix:'Type ',
    footer:'TVBox Config Editor &middot; Blacklisted items are excluded from aggregated output',
  },
  zh: {
    loginTitle:'\u914D\u7F6E\u7F16\u8F91\u5668', loginSubtitle:'\u8BF7\u8F93\u5165\u7BA1\u7406\u4EE4\u724C',
    invalidToken:'\u65E0\u6548\u7684\u4EE4\u724C', tokenPh:'\u7BA1\u7406\u4EE4\u724C', login:'\u767B\u5F55',
    networkError:'\u7F51\u7EDC\u9519\u8BEF',
    headerLabel:'\u914D\u7F6E\u7F16\u8F91\u5668', navAdmin:'\u7BA1\u7406', navDashboard:'\u4EEA\u8868\u76D8',
    searchPh:'\u641C\u7D22\u540D\u79F0\u3001API\u3001URL...', loading:'\u52A0\u8F7D\u4E2D...',
    available:'\u53EF\u7528:', blocked:'\u5DF2\u5C4F\u853D:',
    sites:'\u7AD9\u70B9', parses:'\u89E3\u6790', lives:'\u76F4\u64AD',
    restore:'\u6062\u590D', block:'\u5C4F\u853D',
    groupOther:'\u5176\u4ED6', groupRemotePrefix:'\u8FDC\u7A0B: ', groupRemote:'\u8FDC\u7A0B\u6E90',
    siteType0:'XML \u7AD9\u70B9\uFF1A\u901A\u8FC7 XML \u63A5\u53E3\u83B7\u53D6\u5F71\u89C6\u6570\u636E',
    siteType1:'JSON \u7AD9\u70B9\uFF08MacCMS\uFF09\uFF1A\u901A\u8FC7 JSON API \u83B7\u53D6\u5F71\u89C6\u6570\u636E',
    siteType3:'JAR \u63D2\u4EF6\uFF1A\u901A\u8FC7 Java \u722C\u866B\u63D2\u4EF6\u83B7\u53D6\u6570\u636E\uFF0C\u9700\u8981 spider \u5305',
    siteType4:'\u8FDC\u7A0B\u7AD9\u70B9\uFF1A\u4F7F\u7528\u8FDC\u7A0B\u914D\u7F6E\u7684\u7AD9\u70B9',
    parseType0:'\u55C5\u63A2\u89E3\u6790\uFF1A\u901A\u8FC7\u7F51\u9875\u55C5\u63A2\u63D0\u53D6\u89C6\u9891\u5730\u5740',
    parseType1:'JSON \u89E3\u6790\uFF1A\u76F4\u63A5\u8FD4\u56DE JSON \u683C\u5F0F\u7684\u89C6\u9891\u5730\u5740',
    parseType2:'JSON \u6269\u5C55\u89E3\u6790\uFF1A\u5E26\u6269\u5C55\u53C2\u6570\u7684 JSON \u89E3\u6790',
    parseType3:'\u805A\u5408\u89E3\u6790\uFF1A\u5408\u5E76\u591A\u4E2A\u89E3\u6790\u63A5\u53E3\u7684\u7ED3\u679C',
    parseType4:'\u8D85\u7EA7\u89E3\u6790\uFF1A\u9AD8\u7EA7\u590D\u5408\u89E3\u6790\u6A21\u5F0F',
    liveType0:'\u76F4\u64AD\u6E90\uFF1AM3U/TXT \u683C\u5F0F\u7684\u9891\u9053\u5217\u8868\u6587\u4EF6',
    liveType3:'\u76F4\u64AD\u63D2\u4EF6\uFF1A\u901A\u8FC7 JAR/Python \u63D2\u4EF6\u83B7\u53D6\u9891\u9053',
    typePrefix:'\u7C7B\u578B ',
    footer:'TVBox \u914D\u7F6E\u7F16\u8F91\u5668 &middot; \u88AB\u5C4F\u853D\u7684\u9879\u76EE\u4E0D\u4F1A\u51FA\u73B0\u5728\u805A\u5408\u8F93\u51FA\u4E2D',
  }
};

function _t(key) { const l = getLang(); return _translations[l]?.[key] || _translations.en[key] || key; }

function doToggleLang() {
  const next = getLang() === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', next);
  applyLang(_translations, next);
  if (DATA) render();
}

let TOKEN = '';
let DATA = null;
let CURRENT_TAB = 'sites';

const auth = initAuth('tokenInput', 'loginError', 'loginOverlay', 'mainContent', '/admin/config-data', function() {
  TOKEN = auth.getToken();
  loadData();
});

const SITE_TYPE_TIPS = {
  0: () => _t('siteType0'),
  1: () => _t('siteType1'),
  3: () => _t('siteType3'),
  4: () => _t('siteType4'),
};

const PARSE_TYPE_TIPS = {
  0: () => _t('parseType0'),
  1: () => _t('parseType1'),
  2: () => _t('parseType2'),
  3: () => _t('parseType3'),
  4: () => _t('parseType4'),
};

const LIVE_TYPE_TIPS = {
  0: () => _t('liveType0'),
  3: () => _t('liveType3'),
};

function groupSites(sites) {
  const groups = new Map();
  for (const s of sites) {
    const api = s.api || '';
    let group = _t('groupOther');
    if (api.startsWith('csp_') || api.startsWith('py_') || api.startsWith('js_')) {
      group = api;
    } else if (api.startsWith('http')) {
      try { group = _t('groupRemotePrefix') + new URL(api).hostname; } catch { group = _t('groupRemote'); }
    }
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(s);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

async function loadData() {
  try {
    const res = await fetch('/admin/config-data', {
      headers: { 'Authorization': 'Bearer ' + TOKEN }
    });
    if (res.status === 401) {
      $('loginError').style.display = 'block';
      return;
    }
    DATA = await res.json();
    $('loginOverlay').style.display = 'none';
    $('mainContent').style.display = 'block';
    render();
  } catch (e) {
    $('loginError').textContent = _t('networkError');
    $('loginError').style.display = 'block';
  }
}

function switchTab(tab) {
  CURRENT_TAB = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel' + tab.charAt(0).toUpperCase() + tab.slice(1)));
  $('searchInput').value = '';
  doSearch();
}

function render() {
  if (!DATA) return;
  $('badgeSites').textContent = DATA.sites.length;
  $('badgeParses').textContent = DATA.parses.length;
  $('badgeLives').textContent = DATA.lives.length;
  renderSites();
  renderParses();
  renderLives();
  updateStats();
}

function updateStats() {
  if (!DATA) return;
  const bs = DATA.sites.filter(s => s.blocked).length;
  const bp = DATA.parses.filter(p => p.blocked).length;
  const bl = DATA.lives.filter(l => l.blocked).length;
  $('statsBar').innerHTML =
    '<div class="stat">' + _t('available') + ' <span class="num">' + (DATA.sites.length - bs) + '</span> ' + _t('sites') + ', '
    + '<span class="num">' + (DATA.parses.length - bp) + '</span> ' + _t('parses') + ', '
    + '<span class="num">' + (DATA.lives.length - bl) + '</span> ' + _t('lives') + '</div>'
    + (bs + bp + bl > 0 ? '<div class="stat">' + _t('blocked') + ' <span class="blocked-num">' + (bs + bp + bl) + '</span></div>' : '');
}

function typeSpan(type, tips) {
  const t = type ?? 0;
  const tipFn = tips[t];
  const tip = tipFn ? tipFn() : _t('typePrefix') + t;
  return '<span class="item-type t' + t + '">T' + t + '<span class="tooltip">' + tip + '</span></span>';
}

function renderSites() {
  const container = $('panelSites');
  const groups = groupSites(DATA.sites);
  let html = '';
  for (const [groupName, sites] of groups) {
    html += '<div class="group" data-group="' + groupName + '">'
      + '<div class="group-header" onclick="toggleGroup(this)">'
      + '<div class="group-title">' + esc(groupName) + ' <span class="count">' + sites.length + '</span></div>'
      + '<span class="group-arrow">&#9654;</span>'
      + '</div>'
      + '<div class="group-body">';
    for (const s of sites) {
      html += siteRow(s);
    }
    html += '</div></div>';
  }
  container.innerHTML = html;
}

function siteRow(s) {
  const cls = s.blocked ? 'item blocked' : 'item';
  const btn = s.blocked
    ? '<button class="btn sm secondary" onclick="unblock(\\'sites\\',\\'' + s.fingerprint + '\\')">' + _t('restore') + '</button>'
    : '<button class="btn sm danger" onclick="block(\\'sites\\',\\'' + s.fingerprint + '\\')">' + _t('block') + '</button>';
  return '<div class="' + cls + '" data-search="' + esc((s.name||'') + ' ' + s.key + ' ' + s.api) + '">'
    + '<span class="item-name" title="' + esc(s.key) + '">' + esc(s.name || s.key) + '</span>'
    + typeSpan(s.type, SITE_TYPE_TIPS)
    + '<span class="item-api" title="' + esc(s.api) + '">' + esc(s.api) + '</span>'
    + '<span class="item-actions">' + btn + '</span>'
    + '</div>';
}

function renderParses() {
  const container = $('panelParses');
  let html = '<div class="flat-list">';
  for (const p of DATA.parses) {
    html += parseRow(p);
  }
  html += '</div>';
  container.innerHTML = html;
}

function parseRow(p) {
  const cls = p.blocked ? 'item blocked' : 'item';
  const id = p.url;
  const btn = p.blocked
    ? '<button class="btn sm secondary" onclick="unblock(\\'parses\\',\\'' + esc(id) + '\\')">' + _t('restore') + '</button>'
    : '<button class="btn sm danger" onclick="block(\\'parses\\',\\'' + esc(id) + '\\')">' + _t('block') + '</button>';
  return '<div class="' + cls + '" data-search="' + esc((p.name||'') + ' ' + p.url) + '">'
    + '<span class="item-name">' + esc(p.name) + '</span>'
    + typeSpan(p.type, PARSE_TYPE_TIPS)
    + '<span class="item-api" title="' + esc(p.url) + '">' + esc(p.url) + '</span>'
    + '<span class="item-actions">' + btn + '</span>'
    + '</div>';
}

function renderLives() {
  const container = $('panelLives');
  let html = '<div class="flat-list">';
  for (const l of DATA.lives) {
    html += liveRow(l);
  }
  html += '</div>';
  container.innerHTML = html;
}

function liveRow(l) {
  const url = l.url || l.api || '';
  const cls = l.blocked ? 'item blocked' : 'item';
  const btn = url
    ? (l.blocked
      ? '<button class="btn sm secondary" onclick="unblock(\\'lives\\',\\'' + esc(url) + '\\')">' + _t('restore') + '</button>'
      : '<button class="btn sm danger" onclick="block(\\'lives\\',\\'' + esc(url) + '\\')">' + _t('block') + '</button>')
    : '';
  return '<div class="' + cls + '" data-search="' + esc((l.name||'') + ' ' + url) + '">'
    + '<span class="item-name">' + esc(l.name || '(unnamed)') + '</span>'
    + typeSpan(l.type, LIVE_TYPE_TIPS)
    + '<span class="item-api" title="' + esc(url) + '">' + esc(url) + '</span>'
    + '<span class="item-actions">' + btn + '</span>'
    + '</div>';
}

function toggleGroup(el) {
  el.parentElement.classList.toggle('open');
}

function doSearch() {
  const q = $('searchInput').value.toLowerCase().trim();
  const panel = document.querySelector('.tab-panel.active');
  if (!panel) return;
  panel.querySelectorAll('.item').forEach(item => {
    const text = (item.dataset.search || '').toLowerCase();
    item.style.display = (!q || text.includes(q)) ? '' : 'none';
  });
  panel.querySelectorAll('.group').forEach(g => {
    const visible = g.querySelectorAll('.item:not([style*="display: none"])').length;
    g.style.display = visible > 0 ? '' : 'none';
  });
}

async function block(type, id) {
  try {
    const res = await fetch('/admin/blacklist', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id })
    });
    if (!res.ok) { alert('Failed: ' + (await res.json()).error); return; }
    if (type === 'sites') {
      const s = DATA.sites.find(s => s.fingerprint === id);
      if (s) s.blocked = true;
      renderSites();
    } else if (type === 'parses') {
      const p = DATA.parses.find(p => p.url === id);
      if (p) p.blocked = true;
      renderParses();
    } else if (type === 'lives') {
      const l = DATA.lives.find(l => (l.url || l.api || '') === id);
      if (l) l.blocked = true;
      renderLives();
    }
    updateStats();
  } catch (e) { alert('Network error'); }
}

async function unblock(type, id) {
  try {
    const res = await fetch('/admin/blacklist', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id })
    });
    if (!res.ok) { alert('Failed: ' + (await res.json()).error); return; }
    if (type === 'sites') {
      const s = DATA.sites.find(s => s.fingerprint === id);
      if (s) s.blocked = false;
      renderSites();
    } else if (type === 'parses') {
      const p = DATA.parses.find(p => p.url === id);
      if (p) p.blocked = false;
      renderParses();
    } else if (type === 'lives') {
      const l = DATA.lives.find(l => (l.url || l.api || '') === id);
      if (l) l.blocked = false;
      renderLives();
    }
    updateStats();
  } catch (e) { alert('Network error'); }
}

applyLang(_translations, getLang());
</script>
</body>
</html>`;

// src/core/blacklist.ts
var EMPTY_BLACKLIST = { sites: [], parses: [], lives: [] };
async function siteFingerprint(site) {
  const ext = typeof site.ext === "string" ? site.ext : JSON.stringify(site.ext || "");
  const raw2 = `${site.api}|${ext}|${site.jar || ""}`;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw2));
  const arr = new Uint8Array(buf);
  return Array.from(arr.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function loadBlacklist(storage) {
  try {
    const raw2 = await storage.get(KV_BLACKLIST);
    if (!raw2) return EMPTY_BLACKLIST;
    const parsed = JSON.parse(raw2);
    if (!Array.isArray(parsed.sites) || !Array.isArray(parsed.parses) || !Array.isArray(parsed.lives)) {
      console.warn("[blacklist] Invalid structure, skipping");
      return EMPTY_BLACKLIST;
    }
    return parsed;
  } catch (e) {
    console.error("[blacklist] Failed to load, skipping filter:", e);
    return EMPTY_BLACKLIST;
  }
}
async function saveBlacklist(storage, blacklist) {
  await storage.put(KV_BLACKLIST, JSON.stringify(blacklist));
}
async function applyBlacklist(config2, blacklist) {
  const siteSet = new Set(blacklist.sites);
  const parseSet = new Set(blacklist.parses);
  const liveSet = new Set(blacklist.lives);
  let removedSites = 0;
  let removedParses = 0;
  let removedLives = 0;
  let sites = config2.sites || [];
  if (siteSet.size > 0) {
    const filtered = [];
    for (const site of sites) {
      const fp = await siteFingerprint(site);
      if (siteSet.has(fp)) {
        removedSites++;
      } else {
        filtered.push(site);
      }
    }
    sites = filtered;
  }
  let parses = config2.parses || [];
  if (parseSet.size > 0) {
    parses = parses.filter((p) => {
      if (parseSet.has(p.url)) {
        removedParses++;
        return false;
      }
      return true;
    });
  }
  let lives = config2.lives || [];
  if (liveSet.size > 0) {
    lives = lives.filter((l) => {
      const url = l.url || l.api || "";
      if (url && liveSet.has(url)) {
        removedLives++;
        return false;
      }
      return true;
    });
  }
  return {
    config: { ...config2, sites, parses, lives },
    removedSites,
    removedParses,
    removedLives
  };
}
async function pruneBlacklist(blacklist, currentConfig) {
  const currentSiteFps = /* @__PURE__ */ new Set();
  for (const site of currentConfig.sites || []) {
    currentSiteFps.add(await siteFingerprint(site));
  }
  const currentParseUrls = new Set((currentConfig.parses || []).map((p) => p.url));
  const currentLiveUrls = new Set(
    (currentConfig.lives || []).map((l) => l.url || l.api || "").filter(Boolean)
  );
  const prunedSites = blacklist.sites.filter((fp) => currentSiteFps.has(fp));
  const prunedParses = blacklist.parses.filter((url) => currentParseUrls.has(url));
  const prunedLives = blacklist.lives.filter((url) => currentLiveUrls.has(url));
  const removed = blacklist.sites.length - prunedSites.length + (blacklist.parses.length - prunedParses.length) + (blacklist.lives.length - prunedLives.length);
  if (removed > 0) {
    console.log(`[blacklist] Pruned ${removed} stale entries`);
  }
  return { sites: prunedSites, parses: prunedParses, lives: prunedLives };
}

// src/routes.ts
function createApp(deps) {
  const app = new Hono2();
  const { storage, config: config2 } = deps;
  app.get("/", async (c) => {
    const cached = await storage.get(KV_MERGED_CONFIG);
    if (!cached) {
      return c.json(
        { error: "No config available yet. Add sources in /admin and trigger a refresh." },
        503
      );
    }
    return c.body(cached, 200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
      "Access-Control-Allow-Origin": "*"
    });
  });
  app.get("/live-config", async (c) => {
    const cached = await storage.get(KV_MERGED_CONFIG);
    if (!cached) {
      return c.json({ error: "No config available yet." }, 503);
    }
    try {
      const full = JSON.parse(cached);
      const liveConfig = { lives: full.lives || [] };
      return c.body(JSON.stringify(liveConfig), 200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "*"
      });
    } catch {
      return c.json({ error: "Config parse error" }, 500);
    }
  });
  app.get("/status", (c) => {
    return c.html(dashboardHtml);
  });
  app.get("/status-data", async (c) => {
    const lastUpdate = await storage.get(KV_LAST_UPDATE);
    const sources = await storage.get(KV_MANUAL_SOURCES);
    const macCMSSources = await storage.get(KV_MACCMS_SOURCES);
    const liveSources = await storage.get(KV_LIVE_SOURCES);
    const cached = await storage.get(KV_MERGED_CONFIG);
    let siteCount = 0;
    let parseCount = 0;
    let liveCount = 0;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        siteCount = parsed.sites?.length || 0;
        parseCount = parsed.parses?.length || 0;
        liveCount = parsed.lives?.length || 0;
      } catch {
      }
    }
    return c.json({
      lastUpdate: lastUpdate || "never",
      sourceCount: sources ? JSON.parse(sources).length : 0,
      macCMSCount: macCMSSources ? JSON.parse(macCMSSources).length : 0,
      liveSourceCount: liveSources ? JSON.parse(liveSources).length : 0,
      sites: siteCount,
      parses: parseCount,
      lives: liveCount
    });
  });
  app.get("/admin", (c) => {
    return c.html(adminHtml);
  });
  app.get("/admin/sources", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const raw2 = await storage.get(KV_MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    return c.json(sources);
  });
  app.post("/admin/sources", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    let url = body.url?.trim() || "";
    if (!url) return c.json({ error: "URL is required" }, 400);
    let configKey = body.configKey?.trim() || "";
    const pkMatch = url.match(/;pk;(.+)$/);
    if (pkMatch) {
      configKey = configKey || pkMatch[1];
      url = url.replace(/;pk;.+$/, "");
    }
    try {
      new URL(url);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }
    const name = body.name?.trim() || "";
    const raw2 = await storage.get(KV_MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    if (sources.some((s) => s.url === url)) {
      return c.json({ error: "Source already exists" }, 409);
    }
    const entry = { name, url };
    if (configKey) entry.configKey = configKey;
    sources.push(entry);
    await storage.put(KV_MANUAL_SOURCES, JSON.stringify(sources));
    return c.json({ success: true });
  });
  app.delete("/admin/sources", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    const raw2 = await storage.get(KV_MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const filtered = sources.filter((s) => s.url !== url);
    await storage.put(KV_MANUAL_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  app.post("/admin/sources/import", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const input = body.input?.trim();
    if (!input) return c.json({ error: "input is required" }, 400);
    const isUrl = /^https?:\/\//i.test(input);
    let jsonText;
    let sourceUrl = null;
    let configKey;
    let fetchUrl = input;
    if (isUrl) {
      const pkMatch = input.match(/;pk;(.+)$/);
      if (pkMatch) {
        configKey = pkMatch[1];
        fetchUrl = input.replace(/;pk;.+$/, "");
      }
      sourceUrl = fetchUrl;
      try {
        const resp = await fetch(fetchUrl, {
          headers: { "Accept": "application/json, text/plain, */*", "User-Agent": "okhttp/3.12.0" }
        });
        if (!resp.ok) return c.json({ error: `Fetch failed: HTTP ${resp.status}` }, 502);
        const buffer = await resp.arrayBuffer();
        const decoded = await decodeConfigResponse(buffer, configKey);
        jsonText = decoded || "";
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return c.json({ error: `Fetch failed: ${msg}` }, 502);
      }
    } else {
      jsonText = input;
    }
    const parsed = parseConfigJson(jsonText);
    if (!parsed) return c.json({ error: "Failed to parse JSON" }, 400);
    const raw2 = await storage.get(KV_MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const existingUrls = new Set(sources.map((s) => s.url));
    let added = 0;
    let duplicates = 0;
    const addedSources = [];
    if (isMultiRepoConfig(parsed)) {
      const entries = extractMultiRepoEntries(parsed, "Imported");
      for (const entry of entries) {
        if (existingUrls.has(entry.url)) {
          duplicates++;
        } else {
          sources.push(entry);
          existingUrls.add(entry.url);
          addedSources.push(entry.url);
          added++;
        }
      }
      await storage.put(KV_MANUAL_SOURCES, JSON.stringify(sources));
      return c.json({ type: "multi", added, duplicates, sources: addedSources });
    } else {
      if (sourceUrl) {
        if (existingUrls.has(sourceUrl)) {
          return c.json({ type: "single", added: 0, duplicates: 1, sources: [] });
        }
        const entry = { name: "Imported", url: sourceUrl };
        if (configKey) entry.configKey = configKey;
        sources.push(entry);
        await storage.put(KV_MANUAL_SOURCES, JSON.stringify(sources));
        return c.json({ type: "single", added: 1, duplicates: 0, sources: [sourceUrl] });
      } else {
        const key = `${KV_INLINE_PREFIX}${Date.now()}`;
        await storage.put(key, jsonText);
        const inlineUrl = `inline://${key}`;
        sources.push({ name: "Inline Config", url: inlineUrl });
        await storage.put(KV_MANUAL_SOURCES, JSON.stringify(sources));
        return c.json({ type: "single", added: 1, duplicates: 0, sources: [inlineUrl] });
      }
    }
  });
  app.get("/admin/name-transform", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const raw2 = await storage.get(KV_NAME_TRANSFORM);
    const transform = raw2 ? JSON.parse(raw2) : {};
    return c.json(transform);
  });
  app.put("/admin/name-transform", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (body.extraCleanPatterns) {
      for (const p of body.extraCleanPatterns) {
        try {
          new RegExp(p);
        } catch {
          return c.json({ error: `Invalid regex: ${p}` }, 400);
        }
      }
    }
    const transform = {
      prefix: body.prefix || void 0,
      suffix: body.suffix || void 0,
      promoReplacement: body.promoReplacement || void 0,
      extraCleanPatterns: body.extraCleanPatterns?.length ? body.extraCleanPatterns : void 0
    };
    await storage.put(KV_NAME_TRANSFORM, JSON.stringify(transform));
    return c.json({ success: true });
  });
  app.get("/admin/cron-interval", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const raw2 = await storage.get(KV_CRON_INTERVAL);
    const interval = raw2 ? parseInt(raw2) : DEFAULT_CRON_INTERVAL;
    return c.json({ interval });
  });
  app.put("/admin/cron-interval", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const interval = body.interval;
    const validIntervals = [60, 180, 360, 720, 1440];
    if (!interval || !validIntervals.includes(interval)) {
      return c.json({ error: `interval must be one of: ${validIntervals.join(", ")}` }, 400);
    }
    await storage.put(KV_CRON_INTERVAL, String(interval));
    if (deps.onCronIntervalChange) {
      deps.onCronIntervalChange(interval);
    }
    return c.json({ success: true, interval });
  });
  if (config2.workerBaseUrl) {
    app.all("/api/:key", async (c) => {
      const key = c.req.param("key");
      const raw2 = await storage.get(KV_MACCMS_SOURCES);
      const sources = raw2 ? JSON.parse(raw2) : [];
      const source = sources.find((s) => s.key === key);
      if (!source) {
        return c.json({ error: "Unknown MacCMS source" }, 404);
      }
      try {
        const targetUrl = new URL(source.api);
        const reqUrl = new URL(c.req.url);
        reqUrl.searchParams.forEach((v, k) => targetUrl.searchParams.set(k, v));
        const resp = await fetch(targetUrl.toString());
        const data = await resp.json();
        return c.json(data, 200, {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300"
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        return c.json({ error: msg }, 502);
      }
    });
  }
  if (config2.workerBaseUrl) {
    app.get("/jar/:key", async (c) => {
      const key = c.req.param("key");
      const cache = caches.default;
      const cacheKey2 = new Request(c.req.url);
      const cached = await cache.match(cacheKey2);
      if (cached) return cached;
      const originalUrl = await lookupJarUrl(key, storage);
      if (!originalUrl) {
        return c.json({ error: "Unknown JAR key" }, 404);
      }
      try {
        const resp = await fetch(originalUrl, {
          headers: { "User-Agent": "okhttp/3.12.0" }
        });
        if (!resp.ok) {
          return c.json({ error: `Origin returned ${resp.status}` }, 502);
        }
        const ttl = isMd5Key(key) ? 86400 : 21600;
        const response = new Response(resp.body, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Cache-Control": `public, max-age=${ttl}`,
            "Access-Control-Allow-Origin": "*"
          }
        });
        c.executionCtx.waitUntil(cache.put(cacheKey2, response.clone()));
        return response;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        return c.json({ error: msg }, 502);
      }
    });
  }
  if (config2.workerBaseUrl) {
    app.get("/live/:key", async (c) => {
      const key = c.req.param("key");
      const cache = caches.default;
      const cacheKey2 = new Request(c.req.url);
      const cached = await cache.match(cacheKey2);
      if (cached) return cached;
      const originalUrl = await lookupLiveUrl(key, storage);
      if (!originalUrl) {
        return c.json({ error: "Unknown live source key" }, 404);
      }
      try {
        const resp = await fetch(originalUrl, {
          headers: { "User-Agent": "okhttp/3.12.0" }
        });
        if (!resp.ok) {
          return c.json({ error: `Origin returned ${resp.status}` }, 502);
        }
        const response = new Response(resp.body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": `public, max-age=${LIVE_PROXY_TTL}`,
            "Access-Control-Allow-Origin": "*"
          }
        });
        c.executionCtx.waitUntil(cache.put(cacheKey2, response.clone()));
        return response;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        return c.json({ error: msg }, 502);
      }
    });
  }
  app.get("/admin/lives", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const raw2 = await storage.get(KV_LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    return c.json(entries);
  });
  app.post("/admin/lives", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    try {
      new URL(url);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }
    const name = body.name?.trim() || "";
    const raw2 = await storage.get(KV_LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    if (entries.some((e) => e.url === url)) {
      return c.json({ error: "Live source already exists" }, 409);
    }
    entries.push({ name, url });
    await storage.put(KV_LIVE_SOURCES, JSON.stringify(entries));
    return c.json({ success: true });
  });
  app.delete("/admin/lives", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    const raw2 = await storage.get(KV_LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    const filtered = entries.filter((e) => e.url !== url);
    await storage.put(KV_LIVE_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  app.get("/admin/maccms", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const raw2 = await storage.get(KV_MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    return c.json(sources);
  });
  app.post("/admin/maccms", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const newEntries = Array.isArray(body) ? body : [body];
    for (const entry of newEntries) {
      if (!entry.key?.trim() || !entry.name?.trim() || !entry.api?.trim()) {
        return c.json({ error: "Each entry requires key, name, and api" }, 400);
      }
      try {
        new URL(entry.api);
      } catch {
        return c.json({ error: `Invalid URL: ${entry.api}` }, 400);
      }
    }
    const raw2 = await storage.get(KV_MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const existingKeys = new Set(sources.map((s) => s.key));
    let added = 0;
    for (const entry of newEntries) {
      if (!existingKeys.has(entry.key)) {
        sources.push({ key: entry.key.trim(), name: entry.name.trim(), api: entry.api.trim() });
        existingKeys.add(entry.key);
        added++;
      }
    }
    await storage.put(KV_MACCMS_SOURCES, JSON.stringify(sources));
    return c.json({ success: true, added, total: sources.length });
  });
  app.delete("/admin/maccms", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const key = body.key?.trim();
    if (!key) return c.json({ error: "key is required" }, 400);
    const raw2 = await storage.get(KV_MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const filtered = sources.filter((s) => s.key !== key);
    await storage.put(KV_MACCMS_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  app.post("/admin/maccms/validate", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const api = body.api?.trim();
    if (!api) return c.json({ error: "api is required" }, 400);
    const ok = await validateMacCMS(api, config2.siteTimeoutMs);
    return c.json({ api, valid: ok });
  });
  app.get("/admin/config-editor", (c) => {
    return c.html(configEditorHtml);
  });
  app.get("/admin/config-data", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const full = await storage.get(KV_MERGED_CONFIG_FULL);
    const cached = full || await storage.get(KV_MERGED_CONFIG);
    if (!cached) {
      return c.json({ sites: [], parses: [], lives: [] });
    }
    let parsed;
    try {
      parsed = JSON.parse(cached);
    } catch {
      return c.json({ error: "Config parse error" }, 500);
    }
    const blacklist = await loadBlacklist(storage);
    const siteSet = new Set(blacklist.sites);
    const parseSet = new Set(blacklist.parses);
    const liveSet = new Set(blacklist.lives);
    const sites = [];
    for (const site of parsed.sites || []) {
      const fp = await siteFingerprint(site);
      const api = site.api || "";
      let group = "\u5176\u4ED6";
      if (api.startsWith("csp_") || api.startsWith("py_") || api.startsWith("js_")) {
        group = api;
      } else if (api.startsWith("http")) {
        try {
          group = "\u8FDC\u7A0B: " + new URL(api).hostname;
        } catch {
          group = "\u8FDC\u7A0B\u6E90";
        }
      }
      sites.push({ ...site, fingerprint: fp, blocked: siteSet.has(fp), group });
    }
    const parses = (parsed.parses || []).map((p) => ({
      ...p,
      blocked: parseSet.has(p.url)
    }));
    const lives = (parsed.lives || []).map((l) => ({
      ...l,
      blocked: liveSet.has(l.url || l.api || "")
    }));
    return c.json({ sites, parses, lives });
  });
  app.post("/admin/blacklist", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const { type, id } = body;
    if (!type || !id) return c.json({ error: "type and id are required" }, 400);
    if (!["sites", "parses", "lives"].includes(type)) {
      return c.json({ error: "type must be sites, parses, or lives" }, 400);
    }
    const blacklist = await loadBlacklist(storage);
    const list = blacklist[type];
    if (!list.includes(id)) {
      list.push(id);
    }
    await saveBlacklist(storage, blacklist);
    return c.json({ success: true });
  });
  app.delete("/admin/blacklist", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const { type, id } = body;
    if (!type || !id) return c.json({ error: "type and id are required" }, 400);
    if (!["sites", "parses", "lives"].includes(type)) {
      return c.json({ error: "type must be sites, parses, or lives" }, 400);
    }
    const blacklist = await loadBlacklist(storage);
    const key = type;
    blacklist[key] = blacklist[key].filter((v) => v !== id);
    await saveBlacklist(storage, blacklist);
    return c.json({ success: true });
  });
  app.post("/refresh", async (c) => {
    if (config2.refreshToken || config2.adminToken) {
      const auth = c.req.raw.headers.get("Authorization");
      const validTokens = [config2.refreshToken, config2.adminToken].filter(Boolean);
      if (!validTokens.some((t) => auth === `Bearer ${t}`)) {
        return c.json({ error: "Unauthorized" }, 401);
      }
    }
    try {
      await deps.triggerRefresh();
      return c.json({ success: true, message: "Refresh completed" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return c.json({ success: false, error: msg }, 500);
    }
  });
  return app;
}
function verifyAdmin(request, config2) {
  const token = config2.adminToken;
  if (!token) return false;
  const auth = request.headers.get("Authorization");
  return auth === `Bearer ${token}`;
}

// src/core/parser.ts
function normalizeConfig(sourced) {
  const config2 = sourced.config;
  return {
    ...sourced,
    config: {
      spider: normalizeSpider(config2.spider, sourced.sourceUrl),
      sites: normalizeSites(config2.sites || [], config2.spider, sourced.sourceUrl),
      parses: normalizeParses(config2.parses, sourced.sourceUrl),
      lives: normalizeLives(config2.lives || [], sourced.sourceUrl),
      hosts: config2.hosts || [],
      rules: config2.rules || [],
      doh: config2.doh || [],
      ads: config2.ads || [],
      flags: config2.flags || []
    }
  };
}
function normalizeSpider(spider, sourceUrl) {
  if (!spider) return void 0;
  return resolveUrl(spider, sourceUrl);
}
function normalizeSites(sites, globalSpider, sourceUrl) {
  return sites.filter((site) => site.key && site.api !== void 0).map((site) => {
    const normalized = {
      ...site,
      name: site.name || site.key,
      searchable: site.searchable ?? 1,
      quickSearch: site.quickSearch ?? 1,
      filterable: site.filterable ?? 1
    };
    if (site.type === 0 || site.type === 1) {
      normalized.api = resolveUrl(site.api, sourceUrl);
    }
    if (site.type === 3 && isResolvableUrl(site.api)) {
      normalized.api = resolveUrl(site.api, sourceUrl);
    }
    if (site.jar) {
      normalized.jar = resolveUrl(site.jar, sourceUrl);
    }
    if (site.playUrl) {
      normalized.playUrl = resolveUrl(site.playUrl, sourceUrl);
    }
    if (site.ext) {
      normalized.ext = resolveExt(site.ext, sourceUrl);
    }
    return normalized;
  });
}
function resolveExt(ext, sourceUrl) {
  if (typeof ext === "string") {
    return isResolvableUrl(ext) ? resolveUrl(ext, sourceUrl) : ext;
  }
  const resolved = {};
  for (const [key, value] of Object.entries(ext)) {
    if (typeof value === "string" && isResolvableUrl(value)) {
      resolved[key] = resolveUrl(value, sourceUrl);
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
}
function resolveUrl(url, baseUrl) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) {
    try {
      const base = new URL(baseUrl);
      return `${base.protocol}${url}`;
    } catch {
      return `https:${url}`;
    }
  }
  if (url.startsWith("./") || url.startsWith("../")) {
    try {
      return new URL(url, baseUrl).href;
    } catch {
      return url;
    }
  }
  if (url.startsWith("csp_") || url.startsWith("py_") || url.startsWith("js_")) {
    return url;
  }
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
}
function normalizeParses(parses, sourceUrl) {
  if (!parses) return [];
  return parses.map((parse2) => {
    const normalized = { ...parse2 };
    if (parse2.url) {
      normalized.url = resolveUrl(parse2.url, sourceUrl);
    }
    if (parse2.ext) {
      normalized.ext = resolveExt(parse2.ext, sourceUrl);
    }
    return normalized;
  });
}
function normalizeLives(lives, sourceUrl) {
  return lives.map((live) => {
    const normalized = { ...live };
    if (live.url && isResolvableUrl(live.url)) {
      normalized.url = resolveUrl(live.url, sourceUrl);
    }
    if (live.api) {
      normalized.api = resolveUrl(live.api, sourceUrl);
    }
    if (live.jar) {
      normalized.jar = resolveUrl(live.jar, sourceUrl);
    }
    if (live.epg) {
      normalized.epg = resolveUrl(live.epg, sourceUrl);
    }
    if (live.ext) {
      normalized.ext = resolveExt(live.ext, sourceUrl);
    }
    return normalized;
  });
}
function isResolvableUrl(url) {
  if (!url) return false;
  if (url.startsWith("http://") || url.startsWith("https://")) return true;
  if (url.startsWith("./") || url.startsWith("../")) return true;
  if (url.startsWith("//")) return true;
  if (url.startsWith("csp_") || url.startsWith("py_") || url.startsWith("js_")) return false;
  return false;
}
function extractSpiderJarUrl(spider) {
  if (!spider) return null;
  const parts = spider.split(";md5;");
  let url = parts[0].trim();
  if (url.startsWith("img+")) {
    url = url.substring(4);
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return null;
  }
  return url;
}

// src/core/dedup.ts
function deduplicateSites(sites) {
  const keyMap = /* @__PURE__ */ new Map();
  const dedupKey = (site) => {
    return `${site.key}|${site.api}`;
  };
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Map();
  for (const site of sites) {
    const dk = dedupKey(site);
    if (seen.has(dk)) continue;
    seen.add(dk);
    if (keyMap.has(site.key)) {
      const existing = keyMap.get(site.key);
      if (dedupKey(existing) !== dk) {
        const count = (usedKeys.get(site.key) || 1) + 1;
        usedKeys.set(site.key, count);
        site.key = `${site.key}_${count}`;
        if (site.name) {
          site.name = `${site.name}(${count})`;
        }
      }
    } else {
      keyMap.set(site.key, site);
      usedKeys.set(site.key, 1);
    }
    result.push(site);
  }
  return result;
}
function deduplicateParses(parses) {
  const seen = /* @__PURE__ */ new Set();
  return parses.filter((parse2) => {
    const key = `${parse2.url}|${parse2.type ?? 0}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function deduplicateLives(lives) {
  const seen = /* @__PURE__ */ new Set();
  return lives.filter((live) => {
    const url = live.url || live.api || "";
    if (!url) return true;
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
function deduplicateDoh(dohs) {
  const seen = /* @__PURE__ */ new Set();
  return dohs.filter((doh) => {
    if (seen.has(doh.url)) return false;
    seen.add(doh.url);
    return true;
  });
}
function mergeRules(rules) {
  const hostMap = /* @__PURE__ */ new Map();
  for (const rule of rules) {
    const hostKey = rule.host || (rule.hosts || []).sort().join(",");
    if (!hostKey) {
      hostMap.set(`__anon_${hostMap.size}`, rule);
      continue;
    }
    if (hostMap.has(hostKey)) {
      const existing = hostMap.get(hostKey);
      if (rule.rule) existing.rule = [.../* @__PURE__ */ new Set([...existing.rule || [], ...rule.rule])];
      if (rule.filter) existing.filter = [.../* @__PURE__ */ new Set([...existing.filter || [], ...rule.filter])];
      if (rule.regex) existing.regex = [.../* @__PURE__ */ new Set([...existing.regex || [], ...rule.regex])];
      if (rule.script) existing.script = [.../* @__PURE__ */ new Set([...existing.script || [], ...rule.script])];
    } else {
      hostMap.set(hostKey, { ...rule });
    }
  }
  return [...hostMap.values()];
}
function deduplicateHosts(hosts) {
  const map = /* @__PURE__ */ new Map();
  for (const entry of hosts) {
    const eqIndex = entry.indexOf("=");
    if (eqIndex > 0) {
      const domain = entry.substring(0, eqIndex);
      map.set(domain, entry);
    }
  }
  return [...map.values()];
}
function deduplicateStrings(arr) {
  return [...new Set(arr)];
}

// src/core/merger.ts
function mergeConfigs(sourcedConfigs) {
  const normalized = sourcedConfigs.map(normalizeConfig);
  const globalSpider = selectGlobalSpider(normalized);
  const allSites = [];
  const allParses = [];
  const allLives = [];
  const allHosts = [];
  const allRules = [];
  const allDoh = [];
  const allAds = [];
  const allFlags = [];
  for (const sourced of normalized) {
    const config2 = sourced.config;
    if (config2.sites) {
      for (const site of config2.sites) {
        const siteCopy = { ...site };
        if (site.type === 3 && !site.jar) {
          const spiderJar = extractSpiderJarUrl(config2.spider);
          if (spiderJar && spiderJar !== globalSpider) {
            siteCopy.jar = config2.spider;
          }
        }
        allSites.push(siteCopy);
      }
    }
    if (config2.parses) allParses.push(...config2.parses);
    if (config2.lives) allLives.push(...config2.lives);
    if (config2.hosts) allHosts.push(...config2.hosts);
    if (config2.rules) allRules.push(...config2.rules);
    if (config2.doh) allDoh.push(...config2.doh);
    if (config2.ads) allAds.push(...config2.ads);
    if (config2.flags) allFlags.push(...config2.flags);
  }
  const merged = {
    sites: deduplicateSites(allSites),
    parses: deduplicateParses(allParses || []),
    lives: deduplicateLives(allLives || []),
    hosts: deduplicateHosts(allHosts),
    rules: mergeRules(allRules || []),
    doh: deduplicateDoh(allDoh || []),
    ads: deduplicateStrings(allAds),
    flags: deduplicateStrings(allFlags)
  };
  if (globalSpider) {
    const fullSpider = findFullSpiderString(normalized, globalSpider);
    merged.spider = fullSpider || globalSpider;
  }
  console.log(
    `[merger] Merged: ${merged.sites?.length} sites, ${merged.parses?.length} parses, ${merged.lives?.length} lives`
  );
  return merged;
}
function selectGlobalSpider(configs) {
  const jarCounts = /* @__PURE__ */ new Map();
  for (const sourced of configs) {
    const spiderJar = extractSpiderJarUrl(sourced.config.spider);
    if (!spiderJar) continue;
    const type3Count = (sourced.config.sites || []).filter((s) => s.type === 3 && !s.jar).length;
    if (type3Count > 0) {
      jarCounts.set(spiderJar, (jarCounts.get(spiderJar) || 0) + type3Count);
    }
  }
  if (jarCounts.size === 0) return null;
  let maxJar = null;
  let maxCount = 0;
  for (const [jar, count] of jarCounts) {
    if (count > maxCount) {
      maxCount = count;
      maxJar = jar;
    }
  }
  return maxJar;
}
function findFullSpiderString(configs, jarUrl) {
  for (const sourced of configs) {
    const extracted = extractSpiderJarUrl(sourced.config.spider);
    if (extracted === jarUrl && sourced.config.spider) {
      return sourced.config.spider;
    }
  }
  return null;
}
function cleanEmptyEntries(config2) {
  const before = {
    sites: config2.sites?.length || 0,
    parses: config2.parses?.length || 0,
    lives: config2.lives?.length || 0,
    doh: config2.doh?.length || 0
  };
  const sites = (config2.sites || []).filter((s) => s.key && s.api);
  const parses = (config2.parses || []).filter((p) => p.name && p.url);
  const lives = (config2.lives || []).filter((l) => l.url || l.api);
  const doh = (config2.doh || []).filter((d) => d.name && d.url);
  const removed = before.sites - sites.length + (before.parses - parses.length) + (before.lives - lives.length) + (before.doh - doh.length);
  if (removed > 0) {
    console.log(
      `[cleaner] Removed ${removed} empty entries: ${before.sites - sites.length} sites, ${before.parses - parses.length} parses, ${before.lives - lives.length} lives, ${before.doh - doh.length} doh`
    );
  }
  return { ...config2, sites, parses, lives, doh };
}
function cleanLocalRefs(config2) {
  const isLocal = (url) => url.includes("127.0.0.1") || url.includes("localhost");
  const sites = (config2.sites || []).filter((site) => {
    if (site.api && isLocal(site.api)) {
      console.log(`[cleaner] Removed site ${site.key}: local api ${site.api}`);
      return false;
    }
    if (typeof site.ext === "string" && isLocal(site.ext)) {
      console.log(`[cleaner] Removed site ${site.key}: local ext`);
      return false;
    }
    return true;
  });
  const lives = (config2.lives || []).filter((live) => {
    if (live.url && isLocal(live.url)) {
      console.log(`[cleaner] Removed live ${live.name || "unnamed"}: local url ${live.url}`);
      return false;
    }
    return true;
  });
  const removedSites = (config2.sites?.length || 0) - sites.length;
  const removedLives = (config2.lives?.length || 0) - lives.length;
  if (removedSites > 0 || removedLives > 0) {
    console.log(`[cleaner] Removed ${removedSites} sites, ${removedLives} lives with local refs`);
  }
  return { ...config2, sites, lives };
}

// src/core/speedtest.ts
async function httpSpeedTest(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const start = Date.now();
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "okhttp/3.12.0" }
    });
    const speedMs = Date.now() - start;
    if (!resp.ok) return null;
    await resp.text();
    return speedMs;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function batchSiteSpeedTest(sites, timeoutMs) {
  const tasks = [];
  for (const site of sites) {
    const url = getTestableUrl(site);
    if (url) {
      tasks.push({ key: site.key, url });
    }
  }
  if (tasks.length === 0) return /* @__PURE__ */ new Map();
  console.log(`[speedtest] Testing ${tasks.length} sites concurrently...`);
  const results = await Promise.allSettled(
    tasks.map(async ({ key, url }) => {
      const speedMs = await httpSpeedTest(url, timeoutMs);
      return { key, speedMs };
    })
  );
  const speedMap = /* @__PURE__ */ new Map();
  for (const result of results) {
    if (result.status === "fulfilled") {
      speedMap.set(result.value.key, result.value.speedMs);
    }
  }
  const passed = [...speedMap.values()].filter((v) => v !== null).length;
  console.log(`[speedtest] ${passed}/${speedMap.size} sites reachable`);
  return speedMap;
}
function appendSpeedToName(sites, speedMap) {
  return sites.map((site) => {
    const speedMs = speedMap.get(site.key);
    if (speedMs == null) return site;
    const seconds = (speedMs / 1e3).toFixed(1);
    return { ...site, name: `${site.name || site.key} [${seconds}s]` };
  });
}
function filterUnreachableSites(sites, speedMap) {
  const totalTestable = [...speedMap.keys()].length;
  if (totalTestable === 0) return { sites, filtered: 0 };
  const reachable = [];
  const unreachable = [];
  for (const site of sites) {
    const speed = speedMap.get(site.key);
    if (speed === void 0) {
      reachable.push(site);
    } else if (speed !== null) {
      reachable.push(site);
    } else {
      unreachable.push(site);
    }
  }
  const reachableTestable = reachable.filter((s) => speedMap.has(s.key)).length;
  if (totalTestable > 0 && reachableTestable / totalTestable < 0.1) {
    console.warn(`[speedtest] Safety valve: only ${reachableTestable}/${totalTestable} testable sites reachable (<10%), keeping all`);
    return { sites, filtered: 0 };
  }
  console.log(`[speedtest] Filtered ${unreachable.length} unreachable sites (${reachable.length} kept)`);
  return { sites: reachable, filtered: unreachable.length };
}
function getTestableUrl(site) {
  const api = site.api || "";
  if (site.type === 1) {
    return api.includes("?") ? `${api}&ac=list` : `${api}?ac=list`;
  }
  if (site.type === 0) {
    if (api.startsWith("http")) return api;
    return null;
  }
  if (site.type === 3) {
    if (api.startsWith("http://") || api.startsWith("https://")) return api;
    return null;
  }
  return null;
}

// src/core/cleaner.ts
var DEFAULT_CLEAN_PATTERNS = [
  /关注.*?公众号[：:\s]*[a-zA-Z0-9\u4e00-\u9fa5_-]*/g,
  /公众号[：:\s]*[a-zA-Z0-9\u4e00-\u9fa5_-]+/g,
  /[Vv][Xx][：:\s]*[a-zA-Z0-9_-]+/g,
  /加群[：:\s]*\d+/g,
  /QQ群?[：:\s]*\d+/g,
  /微信[：:\s]*[a-zA-Z0-9_-]+/g,
  /[Tt]elegram[：:\s]*@?[a-zA-Z0-9_]+/g,
  /[Tt][Gg][：:\s]*@?[a-zA-Z0-9_]+/g,
  /免费.*?观看/g,
  /更新.*?地址[：:\s]*\S+/g,
  /最新.*?地址[：:\s]*\S+/g,
  /备用.*?地址[：:\s]*\S+/g
];
var SEPARATOR_TRIM = /^[|｜/／\-—·\s]+|[|｜/／\-—·\s]+$/g;
var SEPARATOR_COLLAPSE = /[|｜/／\-—·]{2,}/g;
function transformSiteNames(config2, transform) {
  if (!config2.sites || config2.sites.length === 0) return config2;
  const patterns = buildPatterns(transform.extraCleanPatterns);
  const replacement = transform.promoReplacement || "";
  const sites = config2.sites.map((site) => {
    let name = site.name || "";
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      name = name.replace(pattern, replacement);
    }
    name = name.replace(SEPARATOR_COLLAPSE, "|");
    name = name.replace(SEPARATOR_TRIM, "");
    if (transform.prefix) name = transform.prefix + name;
    if (transform.suffix) name = name + transform.suffix;
    if (!name.trim()) name = site.key;
    return { ...site, name };
  });
  return { ...config2, sites };
}
function buildPatterns(extraPatterns) {
  const patterns = [...DEFAULT_CLEAN_PATTERNS];
  if (extraPatterns) {
    for (const p of extraPatterns) {
      try {
        patterns.push(new RegExp(p, "g"));
      } catch {
        console.warn(`[cleaner] Invalid extra pattern: ${p}`);
      }
    }
  }
  return patterns;
}

// src/aggregator.ts
async function runAggregation(storage, config2) {
  const startTime = Date.now();
  console.log("[aggregation] Starting...");
  try {
    await _runAggregation(storage, config2, startTime);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : "";
    console.error(`[aggregation] FATAL ERROR: ${msg}`);
    console.error(`[aggregation] Stack: ${stack}`);
    await storage.put(KV_LAST_UPDATE, `ERROR @ ${(/* @__PURE__ */ new Date()).toISOString()}: ${msg}`);
  }
}
async function _runAggregation(storage, config2, startTime) {
  console.log("[aggregation] Step 1: Loading sources...");
  const raw2 = await storage.get(KV_MANUAL_SOURCES);
  const sources = raw2 ? JSON.parse(raw2) : [];
  const macCMSRaw = await storage.get(KV_MACCMS_SOURCES);
  const hasMacCMS = macCMSRaw ? JSON.parse(macCMSRaw).length > 0 : false;
  if (sources.length === 0 && !hasMacCMS) {
    console.warn("[aggregation] No sources configured, nothing to do");
    return;
  }
  console.log(`[aggregation] ${sources.length} config sources configured`);
  await storage.put(KV_SOURCE_URLS, JSON.stringify(sources));
  console.log("[aggregation] Step 1.5: Processing MacCMS sources...");
  const macCMSConfigs = await processMacCMSSources(storage, config2);
  console.log("[aggregation] Step 1.6: Processing live sources...");
  const extraLives = await processLiveSources(storage, config2);
  const remoteSources = sources.filter((s) => !s.url.startsWith("inline://"));
  const inlineSources = sources.filter((s) => s.url.startsWith("inline://"));
  const inlineConfigs = [];
  for (const src of inlineSources) {
    const kvKey = src.url.replace("inline://", "");
    const raw3 = await storage.get(kvKey);
    if (raw3) {
      const parsed = parseConfigJson(raw3);
      if (parsed) {
        inlineConfigs.push({ sourceUrl: src.url, sourceName: src.name || "Inline", config: parsed });
        console.log(`[aggregation] Loaded inline config: ${kvKey}`);
      } else {
        console.warn(`[aggregation] Failed to parse inline config: ${kvKey}`);
      }
    } else {
      console.warn(`[aggregation] Inline config not found in KV: ${kvKey}`);
    }
  }
  console.log("[aggregation] Step 2: Fetching configs...");
  const sourcedConfigs = await fetchConfigs(remoteSources, config2.fetchTimeoutMs);
  if (sourcedConfigs.length === 0 && inlineConfigs.length === 0 && macCMSConfigs.length === 0) {
    console.warn("[aggregation] No valid configs fetched and no MacCMS/inline sources, keeping previous cache");
    return;
  }
  let filteredConfigs = sourcedConfigs;
  const configsWithSpeed = sourcedConfigs.filter((c) => c.speedMs != null);
  if (configsWithSpeed.length > 0) {
    console.log("[aggregation] Step 3: Filtering configs by fetch speed...");
    filteredConfigs = sourcedConfigs.filter((c) => {
      if (c.speedMs == null) return true;
      if (c.speedMs <= config2.speedTimeoutMs) return true;
      console.log(`[aggregation] Filtered out ${c.sourceUrl}: ${c.speedMs}ms > ${config2.speedTimeoutMs}ms`);
      return false;
    });
    if (filteredConfigs.length === 0) {
      console.warn("[aggregation] All configs failed speed filter, using all fetched configs");
      filteredConfigs = sourcedConfigs;
    } else {
      console.log(`[aggregation] ${filteredConfigs.length}/${sourcedConfigs.length} configs passed speed filter`);
    }
  } else {
    console.log("[aggregation] Step 3: No speed data available, skipping filter");
  }
  console.log("[aggregation] Step 4: Merging configs...");
  const allConfigs = [...filteredConfigs, ...inlineConfigs, ...macCMSConfigs];
  let merged = mergeConfigs(allConfigs);
  if (extraLives.length > 0) {
    merged.lives = [...merged.lives || [], ...extraLives];
    console.log(`[aggregation] Injected ${extraLives.length} extra live sources`);
  }
  console.log("[aggregation] Step 4.5: Applying blacklist...");
  const blacklist = await loadBlacklist(storage);
  const hasBlacklist = blacklist.sites.length > 0 || blacklist.parses.length > 0 || blacklist.lives.length > 0;
  await storage.put(KV_MERGED_CONFIG_FULL, JSON.stringify(merged));
  if (hasBlacklist) {
    const pruned = await pruneBlacklist(blacklist, merged);
    if (JSON.stringify(pruned) !== JSON.stringify(blacklist)) {
      await saveBlacklist(storage, pruned);
    }
    const { config: filtered, removedSites, removedParses, removedLives } = await applyBlacklist(merged, pruned);
    merged = filtered;
    console.log(`[aggregation] Blacklist removed: ${removedSites} sites, ${removedParses} parses, ${removedLives} lives`);
  } else {
    console.log("[aggregation] Step 4.5: No blacklist entries, skipping");
  }
  console.log("[aggregation] Step 5: Cleaning invalid entries...");
  merged = cleanEmptyEntries(merged);
  merged = cleanLocalRefs(merged);
  const ntRaw = await storage.get(KV_NAME_TRANSFORM);
  const nameTransform = ntRaw ? JSON.parse(ntRaw) : {};
  const hasTransform = nameTransform.prefix || nameTransform.suffix || nameTransform.promoReplacement || nameTransform.extraCleanPatterns?.length;
  if (hasTransform) {
    console.log("[aggregation] Step 5.5: Applying name transform...");
    merged = transformSiteNames(merged, nameTransform);
  } else {
    console.log("[aggregation] Step 5.5: Cleaning promo text from site names...");
    merged = transformSiteNames(merged, {});
  }
  if (merged.sites && merged.sites.length > 0) {
    console.log("[aggregation] Step 6: Site speed test + unreachable filtering...");
    const speedMap = await batchSiteSpeedTest(merged.sites, config2.siteTimeoutMs);
    if (speedMap.size > 0) {
      const { sites: filteredSites, filtered } = filterUnreachableSites(merged.sites, speedMap);
      merged.sites = filteredSites;
      if (!config2.workerBaseUrl) {
        merged.sites = appendSpeedToName(merged.sites, speedMap);
      }
    }
  } else {
    console.log("[aggregation] Step 6: No sites to test");
  }
  if (config2.workerBaseUrl) {
    console.log("[aggregation] Step 7: Rewriting JAR URLs for CF proxy...");
    merged = await rewriteJarUrls(merged, config2.workerBaseUrl, storage);
  } else {
    console.log("[aggregation] Step 7: Skipping JAR rewrite (local mode)");
  }
  const mergedJson = JSON.stringify(merged);
  await storage.put(KV_MERGED_CONFIG, mergedJson);
  await storage.put(KV_LAST_UPDATE, (/* @__PURE__ */ new Date()).toISOString());
  const elapsed = ((Date.now() - startTime) / 1e3).toFixed(1);
  console.log(
    `[aggregation] Done in ${elapsed}s. ${merged.sites?.length} sites, ${merged.parses?.length} parses, ${merged.lives?.length} lives`
  );
}
async function processMacCMSSources(storage, config2) {
  const raw2 = await storage.get(KV_MACCMS_SOURCES);
  const entries = raw2 ? JSON.parse(raw2) : [];
  if (entries.length === 0) {
    console.log("[aggregation] No MacCMS sources configured");
    return [];
  }
  console.log(`[aggregation] ${entries.length} MacCMS sources found`);
  let validEntries;
  let speedMap;
  if (config2.workerBaseUrl) {
    console.log("[aggregation] CF mode: skipping MacCMS validation, using proxy URLs");
    validEntries = entries;
  } else {
    console.log("[aggregation] Local mode: validating MacCMS sources...");
    const result = await processMacCMSForLocal(entries, config2.siteTimeoutMs);
    validEntries = result.passed;
    speedMap = result.speedMap;
  }
  if (validEntries.length === 0) {
    console.warn("[aggregation] No valid MacCMS sources after processing");
    return [];
  }
  const sites = macCMSToTVBoxSites(validEntries, config2.workerBaseUrl, speedMap);
  console.log(`[aggregation] Converted ${sites.length} MacCMS sources to TVBoxSites`);
  return [{
    sourceUrl: "maccms://builtin",
    sourceName: "MacCMS Sources",
    config: { sites }
  }];
}
async function processLiveSources(storage, config2) {
  const raw2 = await storage.get(KV_LIVE_SOURCES);
  const allEntries = raw2 ? JSON.parse(raw2) : [];
  if (allEntries.length === 0) {
    console.log("[aggregation] No extra live sources to process");
    return [];
  }
  console.log(`[aggregation] ${allEntries.length} manual live sources found`);
  const seen = /* @__PURE__ */ new Set();
  const uniqueEntries = allEntries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
  console.log(`[aggregation] ${uniqueEntries.length} unique live sources after dedup`);
  const { passed, speedMap } = await batchTestLiveSources(uniqueEntries, config2.siteTimeoutMs);
  if (passed.length === 0) {
    console.warn("[aggregation] No live sources passed connectivity test");
    return [];
  }
  const lives = await liveSourcesToTVBoxLives(
    passed,
    config2.workerBaseUrl,
    storage,
    speedMap
  );
  console.log(`[aggregation] Produced ${lives.length} TVBoxLive entries`);
  return lives;
}

// src/node-entry.ts
dotenv.config();
function createStorage() {
  const dataDir = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
  try {
    const { SQLiteStorage: SQLiteStorage2 } = (init_sqlite(), __toCommonJS(sqlite_exports));
    const dbPath = path.join(dataDir, "tvbox.db");
    const storage = new SQLiteStorage2(dbPath);
    console.log(`[storage] SQLite initialized: ${dbPath}`);
    return storage;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[storage] SQLite unavailable (${msg}), falling back to JSON file`);
  }
  const { JsonFileStorage: JsonFileStorage2 } = (init_json_file(), __toCommonJS(json_file_exports));
  const jsonPath = path.join(dataDir, "tvbox-data.json");
  console.log(`[storage] JSON file storage: ${jsonPath}`);
  return new JsonFileStorage2(jsonPath);
}
function buildConfig() {
  return {
    adminToken: process.env.ADMIN_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
    speedTimeoutMs: parseInt(process.env.SPEED_TIMEOUT_MS || "") || DEFAULT_SPEED_TIMEOUT_MS,
    siteTimeoutMs: parseInt(process.env.SITE_TIMEOUT_MS || "") || DEFAULT_SITE_TIMEOUT_MS,
    fetchTimeoutMs: parseInt(process.env.FETCH_TIMEOUT_MS || "") || DEFAULT_FETCH_TIMEOUT_MS,
    cronSchedule: process.env.CRON_SCHEDULE || "0 5 * * *"
  };
}
function intervalToCron(minutes) {
  switch (minutes) {
    case 60:
      return "0 */1 * * *";
    case 180:
      return "0 */3 * * *";
    case 360:
      return "0 */6 * * *";
    case 720:
      return "0 */12 * * *";
    case 1440:
      return "0 5 * * *";
    default:
      return "0 5 * * *";
  }
}
function intervalLabel(minutes) {
  if (minutes < 60) return `${minutes}min`;
  if (minutes < 1440) return `${minutes / 60}h`;
  return `${minutes / 1440}d`;
}
async function main() {
  const storage = createStorage();
  const config2 = buildConfig();
  const port = parseInt(process.env.PORT || "") || 5678;
  let refreshRunning = false;
  const AGGREGATION_TIMEOUT_MS = 12e4;
  const runWithGuard = async () => {
    if (refreshRunning) {
      console.log("[aggregation] Already running, skipping");
      return;
    }
    refreshRunning = true;
    try {
      await Promise.race([
        runAggregation(storage, config2),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Aggregation timed out")), AGGREGATION_TIMEOUT_MS)
        )
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[aggregation] Error: ${msg}`);
    } finally {
      refreshRunning = false;
    }
  };
  let currentTask = null;
  let currentSchedule = "";
  function scheduleCron(cronExpr) {
    if (currentTask) {
      currentTask.stop();
    }
    currentSchedule = cronExpr;
    currentTask = cron.schedule(cronExpr, () => {
      console.log(`[cron] Triggered at ${(/* @__PURE__ */ new Date()).toISOString()}`);
      runWithGuard();
    });
    console.log(`[cron] Scheduled: ${cronExpr}`);
  }
  const storedInterval = await storage.get(KV_CRON_INTERVAL);
  let initialSchedule;
  let intervalMin;
  if (storedInterval) {
    intervalMin = parseInt(storedInterval) || DEFAULT_CRON_INTERVAL;
    initialSchedule = intervalToCron(intervalMin);
  } else {
    initialSchedule = config2.cronSchedule || "0 5 * * *";
    intervalMin = DEFAULT_CRON_INTERVAL;
  }
  scheduleCron(initialSchedule);
  const app = createApp({
    storage,
    config: config2,
    triggerRefresh: runWithGuard,
    onCronIntervalChange: (intervalMinutes) => {
      const newCron = intervalToCron(intervalMinutes);
      console.log(`[cron] Interval changed to ${intervalLabel(intervalMinutes)} (${newCron})`);
      scheduleCron(newCron);
    }
  });
  const lanIp = getLocalIp();
  serve({ fetch: app.fetch, port }, (info) => {
    console.log("");
    console.log("  TVBox Source Aggregator");
    console.log(`  > Local:   http://localhost:${info.port}/`);
    if (lanIp) {
      console.log(`  > Network: http://${lanIp}:${info.port}/`);
    }
    console.log(`  > Admin:   http://${lanIp || "localhost"}:${info.port}/admin`);
    console.log(`  > Status:  http://${lanIp || "localhost"}:${info.port}/status`);
    console.log(`  > Cron:    ${currentSchedule} (every ${intervalLabel(intervalMin)})`);
    console.log("");
    console.log(`  TVBox \u586B\u5165\u5730\u5740: http://${lanIp || "localhost"}:${info.port}/`);
    console.log("");
  });
}
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}
main();
//# sourceMappingURL=server.js.map
