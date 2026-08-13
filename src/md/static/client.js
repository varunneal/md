let Bs = [], oc = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? oc : Bs).push(t = t + n[e]);
})();
function id(n) {
  if (n < 768) return !1;
  for (let e = 0, t = Bs.length; ; ) {
    let i = e + t >> 1;
    if (n < Bs[i]) t = i;
    else if (n >= oc[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function zo(n) {
  return n >= 127462 && n <= 127487;
}
const _o = 8205;
function nd(n, e, t = !0, i = !0) {
  return (t ? ac : rd)(n, e, i);
}
function ac(n, e, t) {
  if (e == n.length) return e;
  e && hc(n.charCodeAt(e)) && cc(n.charCodeAt(e - 1)) && e--;
  let i = is(n, e);
  for (e += Wo(i); e < n.length; ) {
    let r = is(n, e);
    if (i == _o || r == _o || t && id(r))
      e += Wo(r), i = r;
    else if (zo(r)) {
      let s = 0, l = e - 2;
      for (; l >= 0 && zo(is(n, l)); )
        s++, l -= 2;
      if (s % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function rd(n, e, t) {
  for (; e > 1; ) {
    let i = ac(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function is(n, e) {
  let t = n.charCodeAt(e);
  if (!cc(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return hc(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function hc(n) {
  return n >= 56320 && n < 57344;
}
function cc(n) {
  return n >= 55296 && n < 56320;
}
function Wo(n) {
  return n < 65536 ? 1 : 2;
}
class j {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = fi(this, e, t);
    let r = [];
    return this.decompose(
      0,
      e,
      r,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      r,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      r,
      1
      /* Open.From */
    ), Je.from(r, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = fi(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), Je.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), r = new Ni(this), s = new Ni(e);
    for (let l = t, o = t; ; ) {
      if (r.next(l), s.next(l), l = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value)
        return !1;
      if (o += r.value.length, r.done || o >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Ni(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new fc(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let r = this.line(e).from;
      i = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new uc(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? j.empty : e.length <= 32 ? new J(e) : Je.from(J.split(e, []));
  }
}
class J extends j {
  constructor(e, t = sd(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let l = this.text[s], o = r + l.length;
      if ((t ? i : o) >= e)
        return new ld(r, o, i, l);
      r = o + 1, i++;
    }
  }
  decompose(e, t, i, r) {
    let s = e <= 0 && t >= this.length ? this : new J(Bo(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (r & 1) {
      let l = i.pop(), o = sr(s.text, l.text.slice(), 0, s.length);
      if (o.length <= 32)
        i.push(new J(o, l.length + s.length));
      else {
        let a = o.length >> 1;
        i.push(new J(o.slice(0, a)), new J(o.slice(a)));
      }
    } else
      i.push(s);
  }
  replace(e, t, i) {
    if (!(i instanceof J))
      return super.replace(e, t, i);
    [e, t] = fi(this, e, t);
    let r = sr(this.text, sr(i.text, Bo(this.text, 0, e)), t), s = this.length + i.length - (t - e);
    return r.length <= 32 ? new J(r, s) : Je.from(J.split(r, []), s);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = fi(this, e, t);
    let r = "";
    for (let s = 0, l = 0; s <= t && l < this.text.length; l++) {
      let o = this.text[l], a = s + o.length;
      s > e && l && (r += i), e < a && t > s && (r += o.slice(Math.max(0, e - s), t - s)), s = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], r = -1;
    for (let s of e)
      i.push(s), r += s.length + 1, i.length == 32 && (t.push(new J(i, r)), i = [], r = -1);
    return r > -1 && t.push(new J(i, r)), t;
  }
}
class Je extends j {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let l = this.children[s], o = r + l.length, a = i + l.lines - 1;
      if ((t ? a : o) >= e)
        return l.lineInner(e, t, i, r);
      r = o + 1, i = a + 1;
    }
  }
  decompose(e, t, i, r) {
    for (let s = 0, l = 0; l <= t && s < this.children.length; s++) {
      let o = this.children[s], a = l + o.length;
      if (e <= a && t >= l) {
        let h = r & ((l <= e ? 1 : 0) | (a >= t ? 2 : 0));
        l >= e && a <= t && !h ? i.push(o) : o.decompose(e - l, t - l, i, h);
      }
      l = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = fi(this, e, t), i.lines < this.lines)
      for (let r = 0, s = 0; r < this.children.length; r++) {
        let l = this.children[r], o = s + l.length;
        if (e >= s && t <= o) {
          let a = l.replace(e - s, t - s, i), h = this.lines - l.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[r] = a, new Je(c, this.length - (t - e) + i.length);
          }
          return super.replace(s, o, a);
        }
        s = o + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = fi(this, e, t);
    let r = "";
    for (let s = 0, l = 0; s < this.children.length && l <= t; s++) {
      let o = this.children[s], a = l + o.length;
      l > e && s && (r += i), e < a && t > l && (r += o.sliceString(e - l, t - l, i)), l = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Je))
      return 0;
    let i = 0, [r, s, l, o] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; r += t, s += t) {
      if (r == l || s == o)
        return i;
      let a = this.children[r], h = e.children[s];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, r) => i + r.length + 1, -1)) {
    let i = 0;
    for (let O of e)
      i += O.lines;
    if (i < 32) {
      let O = [];
      for (let d of e)
        d.flatten(O);
      return new J(O, t);
    }
    let r = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), s = r << 1, l = r >> 1, o = [], a = 0, h = -1, c = [];
    function f(O) {
      let d;
      if (O.lines > s && O instanceof Je)
        for (let p of O.children)
          f(p);
      else O.lines > l && (a > l || !a) ? (u(), o.push(O)) : O instanceof J && a && (d = c[c.length - 1]) instanceof J && O.lines + d.lines <= 32 ? (a += O.lines, h += O.length + 1, c[c.length - 1] = new J(d.text.concat(O.text), d.length + 1 + O.length)) : (a + O.lines > r && u(), a += O.lines, h += O.length + 1, c.push(O));
    }
    function u() {
      a != 0 && (o.push(c.length == 1 ? c[0] : Je.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let O of e)
      f(O);
    return u(), o.length == 1 ? o[0] : new Je(o, t);
  }
}
j.empty = /* @__PURE__ */ new J([""], 0);
function sd(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function sr(n, e, t = 0, i = 1e9) {
  for (let r = 0, s = 0, l = !0; s < n.length && r <= i; s++) {
    let o = n[s], a = r + o.length;
    a >= t && (a > i && (o = o.slice(0, i - r)), r < t && (o = o.slice(t - r)), l ? (e[e.length - 1] += o, l = !1) : e.push(o)), r = a + 1;
  }
  return e;
}
function Bo(n, e, t) {
  return sr(n, [""], e, t);
}
class Ni {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof J ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, r = this.nodes[i], s = this.offsets[i], l = s >> 1, o = r instanceof J ? r.text.length : r.children.length;
      if (l == (t > 0 ? o : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((s & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (r instanceof J) {
        let a = r.text[l + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = r.children[l + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof J ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class fc {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new Ni(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: r } = this.cursor.next(e);
    return this.pos += (r.length + e) * t, this.value = r.length <= i ? r : t < 0 ? r.slice(r.length - i) : r.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class uc {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: r } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (j.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Ni.prototype[Symbol.iterator] = fc.prototype[Symbol.iterator] = uc.prototype[Symbol.iterator] = function() {
  return this;
});
let ld = class {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.number = i, this.text = r;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
};
function fi(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function Oe(n, e, t = !0, i = !0) {
  return nd(n, e, t, i);
}
function od(n) {
  return n >= 56320 && n < 57344;
}
function ad(n) {
  return n >= 55296 && n < 56320;
}
function hd(n, e) {
  let t = n.charCodeAt(e);
  if (!ad(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return od(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function cd(n) {
  return n < 65536 ? 1 : 2;
}
const Vs = /\r\n?|\n/;
var me = /* @__PURE__ */ (function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
})(me || (me = {}));
class st {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, r = 0; t < this.sections.length; ) {
      let s = this.sections[t++], l = this.sections[t++];
      l < 0 ? (e(i, r, s), r += s) : r += l, i += s;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    qs(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      r < 0 ? e.push(i, r) : e.push(r, i);
    }
    return new st(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : Oc(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Ds(this, e, t);
  }
  mapPos(e, t = -1, i = me.Simple) {
    let r = 0, s = 0;
    for (let l = 0; l < this.sections.length; ) {
      let o = this.sections[l++], a = this.sections[l++], h = r + o;
      if (a < 0) {
        if (h > e)
          return s + (e - r);
        s += o;
      } else {
        if (i != me.Simple && h >= e && (i == me.TrackDel && r < e && h > e || i == me.TrackBefore && r < e || i == me.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !o)
          return e == r || t < 0 ? s : s + a;
        s += a;
      }
      r = h;
    }
    if (e > r)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
    return s;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, r = 0; i < this.sections.length && r <= t; ) {
      let s = this.sections[i++], l = this.sections[i++], o = r + s;
      if (l >= 0 && r <= t && o >= e)
        return r < e && o > t ? "cover" : !0;
      r = o;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      e += (e ? " " : "") + i + (r >= 0 ? ":" + r : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new st(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new st(e);
  }
}
class ie extends st {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return qs(this, (t, i, r, s, l) => e = e.replace(r, r + (i - t), l), !1), e;
  }
  mapDesc(e, t = !1) {
    return Ds(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let r = 0, s = 0; r < t.length; r += 2) {
      let l = t[r], o = t[r + 1];
      if (o >= 0) {
        t[r] = o, t[r + 1] = l;
        let a = r >> 1;
        for (; i.length < a; )
          i.push(j.empty);
        i.push(l ? e.slice(s, s + l) : j.empty);
      }
      s += l;
    }
    return new ie(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : Oc(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : Ds(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    qs(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return st.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], r = [], s = new nn(this);
    e: for (let l = 0, o = 0; ; ) {
      let a = l == e.length ? 1e9 : e[l++];
      for (; o < a || o == a && s.len == 0; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, a - o);
        ue(r, c, -1);
        let f = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
        ue(t, c, f), f > 0 && Pt(i, t, s.text), s.forward(c), o += c;
      }
      let h = e[l++];
      for (; o < h; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, h - o);
        ue(t, c, -1), ue(r, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), o += c;
      }
    }
    return {
      changes: new ie(t, i),
      filtered: st.create(r)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], r = this.sections[t + 1];
      r < 0 ? e.push(i) : r == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let r = [], s = [], l = 0, o = null;
    function a(c = !1) {
      if (!c && !r.length)
        return;
      l < t && ue(r, t - l, -1);
      let f = new ie(r, s);
      o = o ? o.compose(f.map(o)) : f, r = [], s = [], l = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof ie) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), o = o ? o.compose(c.map(o)) : c;
      } else {
        let { from: f, to: u = f, insert: O } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let d = O ? typeof O == "string" ? j.of(O.split(i || Vs)) : O : j.empty, p = d.length;
        if (f == u && p == 0)
          return;
        f < l && a(), f > l && ue(r, f - l, -1), ue(r, u - f, p), Pt(s, r, d), l = u;
      }
    }
    return h(e), a(!o), o;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ie(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (typeof s == "number")
        t.push(s, -1);
      else {
        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((l, o) => o && typeof l != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (s.length == 1)
          t.push(s[0], 0);
        else {
          for (; i.length < r; )
            i.push(j.empty);
          i[r] = j.of(s.slice(1)), t.push(s[0], i[r].length);
        }
      }
    }
    return new ie(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new ie(e, t);
  }
}
function ue(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let r = n.length - 2;
  r >= 0 && t <= 0 && t == n[r + 1] ? n[r] += e : r >= 0 && e == 0 && n[r] == 0 ? n[r + 1] += t : i ? (n[r] += e, n[r + 1] += t) : n.push(e, t);
}
function Pt(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(j.empty);
    n.push(t);
  }
}
function qs(n, e, t) {
  let i = n.inserted;
  for (let r = 0, s = 0, l = 0; l < n.sections.length; ) {
    let o = n.sections[l++], a = n.sections[l++];
    if (a < 0)
      r += o, s += o;
    else {
      let h = r, c = s, f = j.empty;
      for (; h += o, c += a, a && i && (f = f.append(i[l - 2 >> 1])), !(t || l == n.sections.length || n.sections[l + 1] < 0); )
        o = n.sections[l++], a = n.sections[l++];
      e(r, h, s, c, f), r = h, s = c;
    }
  }
}
function Ds(n, e, t, i = !1) {
  let r = [], s = i ? [] : null, l = new nn(n), o = new nn(e);
  for (let a = -1; ; ) {
    if (l.done && o.len || o.done && l.len)
      throw new Error("Mismatched change set lengths");
    if (l.ins == -1 && o.ins == -1) {
      let h = Math.min(l.len, o.len);
      ue(r, h, -1), l.forward(h), o.forward(h);
    } else if (o.ins >= 0 && (l.ins < 0 || a == l.i || l.off == 0 && (o.len < l.len || o.len == l.len && !t))) {
      let h = o.len;
      for (ue(r, o.ins, -1); h; ) {
        let c = Math.min(l.len, h);
        l.ins >= 0 && a < l.i && l.len <= c && (ue(r, 0, l.ins), s && Pt(s, r, l.text), a = l.i), l.forward(c), h -= c;
      }
      o.next();
    } else if (l.ins >= 0) {
      let h = 0, c = l.len;
      for (; c; )
        if (o.ins == -1) {
          let f = Math.min(c, o.len);
          h += f, c -= f, o.forward(f);
        } else if (o.ins == 0 && o.len < c)
          c -= o.len, o.next();
        else
          break;
      ue(r, h, a < l.i ? l.ins : 0), s && a < l.i && Pt(s, r, l.text), a = l.i, l.forward(l.len - c);
    } else {
      if (l.done && o.done)
        return s ? ie.createSet(r, s) : st.create(r);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function Oc(n, e, t = !1) {
  let i = [], r = t ? [] : null, s = new nn(n), l = new nn(e);
  for (let o = !1; ; ) {
    if (s.done && l.done)
      return r ? ie.createSet(i, r) : st.create(i);
    if (s.ins == 0)
      ue(i, s.len, 0, o), s.next();
    else if (l.len == 0 && !l.done)
      ue(i, 0, l.ins, o), r && Pt(r, i, l.text), l.next();
    else {
      if (s.done || l.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(s.len2, l.len), h = i.length;
        if (s.ins == -1) {
          let c = l.ins == -1 ? -1 : l.off ? 0 : l.ins;
          ue(i, a, c, o), r && c && Pt(r, i, l.text);
        } else l.ins == -1 ? (ue(i, s.off ? 0 : s.len, a, o), r && Pt(r, i, s.textBit(a))) : (ue(i, s.off ? 0 : s.len, l.off ? 0 : l.ins, o), r && !l.off && Pt(r, i, l.text));
        o = (s.ins > a || l.ins >= 0 && l.len > a) && (o || i.length > h), s.forward2(a), l.forward(a);
      }
    }
  }
}
class nn {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? j.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? j.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class wt {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.flags = i, this.goalColumn = r;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  A flag that, when set, makes some selection-extending commands
  treat the range's head and anchor as exchangeable, so that for
  example Shift-ArrowUp will make the lower side of the selection
  the anchor, even if that was the head before. Used to implement
  MacOS-style undirectional selections.
  */
  get undirectional() {
    return (this.flags & 64) > 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, r;
    return this.empty ? i = r = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), i == this.from && r == this.to ? this : new wt(i, r, this.flags, this.goalColumn);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, i = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return Q.range(e, t, void 0, void 0, i);
    let r = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return Q.range(this.anchor, r, void 0, void 0, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return Q.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i, r) {
    return new wt(e, t, i, r);
  }
}
class Q {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : Q.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new Q([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return Q.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, Q.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new Q(e.ranges.map((t) => wt.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new Q([Q.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, r = 0; r < e.length; r++) {
      let s = e[r];
      if (s.empty ? s.from <= i : s.from < i)
        return Q.normalized(e.slice(), t);
      i = s.to;
    }
    return new Q(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, r) {
    return wt.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)), r);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, r, s) {
    let l = r == null ? 7 : Math.min(6, r);
    return !s && e != t && (s = t < e ? 1 : -1), s && (l |= s < 0 ? 8 : 16), t < e ? wt.create(t, e, l | 32, i) : wt.create(e, t, l, i);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return wt.create(e, t, 64, void 0);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((r, s) => r.from - s.from), t = e.indexOf(i);
    for (let r = 1; r < e.length; r++) {
      let s = e[r], l = e[r - 1];
      if (s.empty ? s.from <= l.to : s.from < l.to) {
        let o = l.from, a = Math.max(s.to, l.to);
        r <= t && t--, e.splice(--r, 2, s.anchor > s.head ? Q.range(a, o) : Q.range(o, a));
      }
    }
    return new Q(e, t);
  }
}
function dc(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Bl = 0;
class T {
  constructor(e, t, i, r, s) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = r, this.id = Bl++, this.default = e([]), this.extensions = typeof s == "function" ? s(this) : s;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new T(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Vl), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new lr([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new lr(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new lr(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function Vl(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class lr {
  constructor(e, t, i, r) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = r, this.id = Bl++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, r = this.facet.compareInput, s = this.id, l = e[s] >> 1, o = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
    return {
      create(f) {
        return f.values[l] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || Is(f, c)) {
          let O = i(f);
          if (o ? !Vo(O, f.values[l], r) : !r(O, f.values[l]))
            return f.values[l] = O, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let O, d = u.config.address[s];
        if (d != null) {
          let p = pr(u, d);
          if (this.dependencies.every((g) => g instanceof T ? u.facet(g) === f.facet(g) : g instanceof Ae ? u.field(g, !1) == f.field(g, !1) : !0) || (o ? Vo(O = i(f), p, r) : r(O = i(f), p)))
            return f.values[l] = p, 0;
        } else
          O = i(f);
        return f.values[l] = O, 1;
      }
    };
  }
  get extension() {
    return this;
  }
}
function Vo(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Is(n, e) {
  let t = !1;
  for (let i of e)
    Ui(n, i) & 1 && (t = !0);
  return t;
}
function fd(n, e, t) {
  let i = t.map((a) => n[a.id]), r = t.map((a) => a.type), s = i.filter((a) => !(a & 1)), l = n[e.id] >> 1;
  function o(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = pr(a, i[c]);
      if (r[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        Ui(a, h);
      return a.values[l] = o(a), 1;
    },
    update(a, h) {
      if (!Is(a, s))
        return 0;
      let c = o(a);
      return e.compare(c, a.values[l]) ? 0 : (a.values[l] = c, 1);
    },
    reconfigure(a, h) {
      let c = Is(a, i), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && Vl(t, f))
        return a.values[l] = u, 0;
      let O = o(a);
      return e.compare(O, u) ? (a.values[l] = u, 0) : (a.values[l] = O, 1);
    }
  };
}
const Mn = /* @__PURE__ */ T.define({ static: !0 });
class Ae {
  constructor(e, t, i, r, s) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = r, this.spec = s, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new Ae(Bl++, e.create, e.update, e.compare || ((i, r) => i === r), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Mn).find((i) => i.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, r) => {
        let s = i.values[t], l = this.updateF(s, r);
        return this.compareF(s, l) ? 0 : (i.values[t] = l, 1);
      },
      reconfigure: (i, r) => {
        let s = i.facet(Mn), l = r.facet(Mn), o;
        return (o = s.find((a) => a.field == this)) && o != l.find((a) => a.field == this) ? (i.values[t] = o.create(i), 1) : r.config.address[this.id] != null ? (i.values[t] = r.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, Mn.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const zt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Xi(n) {
  return (e) => new pc(e, n);
}
const $i = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Xi(zt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Xi(zt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Xi(zt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ Xi(zt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Xi(zt.lowest)
};
class pc {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class _r {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Gs(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return _r.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Gs {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class dr {
  constructor(e, t, i, r, s, l) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = r, this.staticValues = s, this.facets = l, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let r = [], s = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ new Map();
    for (let u of ud(e, t, l))
      u instanceof Ae ? r.push(u) : (s[u.facet.id] || (s[u.facet.id] = [])).push(u);
    let o = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of r)
      o[u.id] = h.length << 1, h.push((O) => u.slot(O));
    let c = i == null ? void 0 : i.config.facets;
    for (let u in s) {
      let O = s[u], d = O[0].facet, p = c && c[u] || [];
      if (O.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (o[d.id] = a.length << 1 | 1, Vl(p, O))
          a.push(i.facet(d));
        else {
          let g = d.combine(O.map((S) => S.value));
          a.push(i && d.compare(g, i.facet(d)) ? i.facet(d) : g);
        }
      else {
        for (let g of O)
          g.type == 0 ? (o[g.id] = a.length << 1 | 1, a.push(g.value)) : (o[g.id] = h.length << 1, h.push((S) => g.dynamicSlot(S)));
        o[d.id] = h.length << 1, h.push((g) => fd(g, d, O));
      }
    }
    let f = h.map((u) => u(o));
    return new dr(e, l, f, o, a, s);
  }
}
function ud(n, e, t) {
  let i = [[], [], [], [], []], r = /* @__PURE__ */ new Map();
  function s(l, o) {
    let a = r.get(l);
    if (a != null) {
      if (a <= o)
        return;
      let h = i[a].indexOf(l);
      h > -1 && i[a].splice(h, 1), l instanceof Gs && t.delete(l.compartment);
    }
    if (r.set(l, o), Array.isArray(l))
      for (let h of l)
        s(h, o);
    else if (l instanceof Gs) {
      if (t.has(l.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(l.compartment) || l.inner;
      t.set(l.compartment, h), s(h, o);
    } else if (l instanceof pc)
      s(l.inner, l.prec);
    else if (l instanceof Ae)
      i[o].push(l), l.provides && s(l.provides, o);
    else if (l instanceof lr)
      i[o].push(l), l.facet.extensions && s(l.facet.extensions, zt.default);
    else {
      let h = l.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${l}).`);
      if (h == l)
        throw new Error(`Unrecognized extension value in extension set (${l}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      s(h, o);
    }
  }
  return s(n, zt.default), i.reduce((l, o) => l.concat(o));
}
function Ui(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let r = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | r;
}
function pr(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const gc = /* @__PURE__ */ T.define(), Ns = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), mc = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Sc = /* @__PURE__ */ T.define(), Qc = /* @__PURE__ */ T.define(), bc = /* @__PURE__ */ T.define(), yc = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : !1
});
class Qt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new Od();
  }
}
class Od {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new Qt(this, e);
  }
}
class dd {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new I(this, e);
  }
}
class I {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new I(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new dd(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let r of e) {
      let s = r.map(t);
      s && i.push(s);
    }
    return i;
  }
}
I.reconfigure = /* @__PURE__ */ I.define();
I.appendConfig = /* @__PURE__ */ I.define();
class ee {
  constructor(e, t, i, r, s, l) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = r, this.annotations = s, this.scrollIntoView = l, this._doc = null, this._state = null, i && dc(i, t.newLength), s.some((o) => o.type == ee.time) || (this.annotations = s.concat(ee.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, r, s, l) {
    return new ee(e, t, i, r, s, l);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(ee.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
ee.time = /* @__PURE__ */ Qt.define();
ee.userEvent = /* @__PURE__ */ Qt.define();
ee.addToHistory = /* @__PURE__ */ Qt.define();
ee.remote = /* @__PURE__ */ Qt.define();
function pd(n, e) {
  let t = [];
  for (let i = 0, r = 0; ; ) {
    let s, l;
    if (i < n.length && (r == e.length || e[r] >= n[i]))
      s = n[i++], l = n[i++];
    else if (r < e.length)
      s = e[r++], l = e[r++];
    else
      return t;
    !t.length || t[t.length - 1] < s ? t.push(s, l) : t[t.length - 1] < l && (t[t.length - 1] = l);
  }
}
function kc(n, e, t) {
  var i;
  let r, s, l;
  return t ? (r = e.changes, s = ie.empty(e.changes.length), l = n.changes.compose(e.changes)) : (r = e.changes.map(n.changes), s = n.changes.mapDesc(e.changes, !0), l = n.changes.compose(r)), {
    changes: l,
    selection: e.selection ? e.selection.map(s) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(r),
    effects: I.mapEffects(n.effects, r).concat(I.mapEffects(e.effects, s)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function Us(n, e, t) {
  let i = e.selection, r = ri(e.annotations);
  return e.userEvent && (r = r.concat(ee.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ie ? e.changes : ie.of(e.changes || [], t, n.facet(mc)),
    selection: i && (i instanceof Q ? i : Q.single(i.anchor, i.head)),
    effects: ri(e.effects),
    annotations: r,
    scrollIntoView: !!e.scrollIntoView
  };
}
function xc(n, e, t) {
  let i = Us(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let s = 1; s < e.length; s++) {
    e[s].filter === !1 && (t = !1);
    let l = !!e[s].sequential;
    i = kc(i, Us(n, e[s], l ? i.changes.newLength : n.doc.length), l);
  }
  let r = ee.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return md(t ? gd(r) : r);
}
function gd(n) {
  let e = n.startState, t = !0;
  for (let r of e.facet(Sc)) {
    let s = r(n);
    if (s === !1) {
      t = !1;
      break;
    }
    Array.isArray(s) && (t = t === !0 ? s : pd(t, s));
  }
  if (t !== !0) {
    let r, s;
    if (t === !1)
      s = n.changes.invertedDesc, r = ie.empty(e.doc.length);
    else {
      let l = n.changes.filter(t);
      r = l.changes, s = l.filtered.mapDesc(l.changes).invertedDesc;
    }
    n = ee.create(e, r, n.selection && n.selection.map(s), I.mapEffects(n.effects, s), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Qc);
  for (let r = i.length - 1; r >= 0; r--) {
    let s = i[r](n);
    s instanceof ee ? n = s : Array.isArray(s) && s.length == 1 && s[0] instanceof ee ? n = s[0] : n = xc(e, ri(s), !1);
  }
  return n;
}
function md(n) {
  let e = n.startState, t = e.facet(bc), i = n;
  for (let r = t.length - 1; r >= 0; r--) {
    let s = t[r](n);
    s && Object.keys(s).length && (i = kc(i, Us(e, s, n.changes.newLength), !0));
  }
  return i == n ? n : ee.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const Sd = [];
function ri(n) {
  return n == null ? Sd : Array.isArray(n) ? n : [n];
}
var ut = /* @__PURE__ */ (function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
})(ut || (ut = {}));
const Qd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Fs;
try {
  Fs = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function bd(n) {
  if (Fs)
    return Fs.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || Qd.test(t)))
      return !0;
  }
  return !1;
}
function yd(n) {
  return (e) => {
    if (!/\S/.test(e))
      return ut.Space;
    if (bd(e))
      return ut.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return ut.Word;
    return ut.Other;
  };
}
class z {
  constructor(e, t, i, r, s, l) {
    this.config = e, this.doc = t, this.selection = i, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, l && (l._state = this);
    for (let o = 0; o < this.config.dynamicSlots.length; o++)
      Ui(this, o << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Ui(this, i), pr(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return xc(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: r } = t;
    for (let o of e.effects)
      o.is(_r.reconfigure) ? (t && (r = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => r.set(h, a)), t = null), r.set(o.value.compartment, o.value.extension)) : o.is(I.reconfigure) ? (t = null, i = o.value) : o.is(I.appendConfig) && (t = null, i = ri(i).concat(o.value));
    let s;
    t ? s = e.startState.values.slice() : (t = dr.resolve(i, r, this), s = new z(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let l = e.startState.facet(Ns) ? e.newSelection : e.newSelection.asSingle();
    new z(t, e.newDoc, l, s, (o, a) => a.update(o, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: Q.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), r = this.changes(i.changes), s = [i.range], l = ri(i.effects);
    for (let o = 1; o < t.ranges.length; o++) {
      let a = e(t.ranges[o]), h = this.changes(a.changes), c = h.map(r);
      for (let u = 0; u < o; u++)
        s[u] = s[u].map(c);
      let f = r.mapDesc(h, !0);
      s.push(a.range.map(f)), r = r.compose(c), l = I.mapEffects(l, c).concat(I.mapEffects(ri(a.effects), f));
    }
    return {
      changes: r,
      selection: Q.create(s, t.mainIndex),
      effects: l
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ie ? e : ie.of(e, this.doc.length, this.facet(z.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return j.of(e.split(this.facet(z.lineSeparator) || Vs));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (Ui(this, t), pr(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let r = e[i];
        r instanceof Ae && this.config.address[r.id] != null && (t[i] = r.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let r = [];
    if (i) {
      for (let s in i)
        if (Object.prototype.hasOwnProperty.call(e, s)) {
          let l = i[s], o = e[s];
          r.push(l.init((a) => l.spec.fromJSON(o, a)));
        }
    }
    return z.create({
      doc: e.doc,
      selection: Q.fromJSON(e.selection),
      extensions: t.extensions ? r.concat([t.extensions]) : r
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = dr.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof j ? e.doc : j.of((e.doc || "").split(t.staticFacet(z.lineSeparator) || Vs)), r = e.selection ? e.selection instanceof Q ? e.selection : Q.single(e.selection.anchor, e.selection.head) : Q.single(0);
    return dc(r, i.length), t.staticFacet(Ns) || (r = r.asSingle()), new z(t, i, r, t.dynamicSlots.map(() => null), (s, l) => l.create(s), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(z.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(z.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(yc);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(z.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, r) => {
      if (r == "$")
        return "$";
      let s = +(r || 1);
      return !s || s > t.length ? i : t[s - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let r = [];
    for (let s of this.facet(gc))
      for (let l of s(this, t, i))
        Object.prototype.hasOwnProperty.call(l, e) && r.push(l[e]);
    return r;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return yd(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: r } = this.doc.lineAt(e), s = this.charCategorizer(e), l = e - i, o = e - i;
    for (; l > 0; ) {
      let a = Oe(t, l, !1);
      if (s(t.slice(a, l)) != ut.Word)
        break;
      l = a;
    }
    for (; o < r; ) {
      let a = Oe(t, o);
      if (s(t.slice(o, a)) != ut.Word)
        break;
      o = a;
    }
    return l == o ? null : Q.range(l + i, o + i);
  }
}
z.allowMultipleSelections = Ns;
z.tabSize = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : 4
});
z.lineSeparator = mc;
z.readOnly = yc;
z.phrases = /* @__PURE__ */ T.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((r) => n[r] == e[r]);
  }
});
z.languageData = gc;
z.changeFilter = Sc;
z.transactionFilter = Qc;
z.transactionExtender = bc;
_r.reconfigure = /* @__PURE__ */ I.define();
function wc(n, e, t = {}) {
  let i = {};
  for (let r of n)
    for (let s of Object.keys(r)) {
      let l = r[s], o = i[s];
      if (o === void 0)
        i[s] = l;
      else if (!(o === l || l === void 0)) if (Object.hasOwnProperty.call(t, s))
        i[s] = t[s](o, l);
      else
        throw new Error("Config merge conflict for field " + s);
    }
  for (let r in e)
    i[r] === void 0 && (i[r] = e[r]);
  return i;
}
class vt {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return Hs.create(e, t, this);
  }
}
vt.prototype.startSide = vt.prototype.endSide = 0;
vt.prototype.point = !1;
vt.prototype.mapMode = me.TrackDel;
function ql(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let Hs = class $c {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new $c(e, t, i);
  }
};
function Ks(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
let kd = class Pc {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = r;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, r = 0) {
    let s = i ? this.to : this.from;
    for (let l = r, o = s.length; ; ) {
      if (l == o)
        return l;
      let a = l + o >> 1, h = s[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == l)
        return h >= 0 ? l : o;
      h >= 0 ? o = a : l = a + 1;
    }
  }
  between(e, t, i, r) {
    for (let s = this.findIndex(t, -1e9, !0), l = this.findIndex(i, 1e9, !1, s); s < l; s++)
      if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], r = [], s = [], l = -1, o = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, O;
      if (c == f) {
        let d = t.mapPos(c, h.startSide, h.mapMode);
        if (d == null || (u = O = d, h.startSide != h.endSide && (O = t.mapPos(c, h.endSide), O < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), O = t.mapPos(f, h.endSide), u > O || u == O && h.startSide > 0 && h.endSide <= 0)
        continue;
      (O - u || h.endSide - h.startSide) < 0 || (l < 0 && (l = u), h.point && (o = Math.max(o, O - u)), i.push(h), r.push(u - l), s.push(O - l));
    }
    return { mapped: i.length ? new Pc(r, s, i, o) : null, pos: l };
  }
};
class E {
  constructor(e, t, i, r) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = r;
  }
  /**
  @internal
  */
  static create(e, t, i, r) {
    return new E(e, t, i, r);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: r = 0, filterTo: s = this.length } = e, l = e.filter;
    if (t.length == 0 && !l)
      return this;
    if (i && (t = t.slice().sort(Ks)), this.isEmpty)
      return t.length ? E.of(t) : this;
    let o = new vc(this, null, -1).goto(0), a = 0, h = [], c = new Tt();
    for (; o.value || a < t.length; )
      if (a < t.length && (o.from - t[a].from || o.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else o.rangeIndex == 1 && o.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(o.chunkIndex) < t[a].from) && (!l || r > this.chunkEnd(o.chunkIndex) || s < this.chunkPos[o.chunkIndex]) && c.addChunk(this.chunkPos[o.chunkIndex], this.chunk[o.chunkIndex]) ? o.nextChunk() : ((!l || r > o.to || s < o.from || l(o.from, o.to, o.value)) && (c.addInner(o.from, o.to, o.value) || h.push(Hs.create(o.from, o.to, o.value))), o.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? E.empty : this.nextLayer.update({ add: h, filter: l, filterFrom: r, filterTo: s }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], r = -1;
    for (let l = 0; l < this.chunk.length; l++) {
      let o = this.chunkPos[l], a = this.chunk[l], h = e.touchesRange(o, o + a.length);
      if (h === !1)
        r = Math.max(r, a.maxPoint), t.push(a), i.push(e.mapPos(o));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(o, e);
        c && (r = Math.max(r, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let s = this.nextLayer.map(e);
    return t.length == 0 ? s : new E(i, t, s || E.empty, r);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let r = 0; r < this.chunk.length; r++) {
        let s = this.chunkPos[r], l = this.chunk[r];
        if (t >= s && e <= s + l.length && l.between(s, e - s, t - s, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return rn.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return rn.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, r, s = -1) {
    let l = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), o = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), a = qo(l, o, i), h = new Ri(l, a, s), c = new Ri(o, a, s);
    i.iterGaps((f, u, O) => Do(h, f, c, u, O, r)), i.empty && i.length == 0 && Do(h, 0, c, 0, 0, r);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, r) {
    r == null && (r = 999999999);
    let s = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), l = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (s.length != l.length)
      return !1;
    if (!s.length)
      return !0;
    let o = qo(s, l), a = new Ri(s, o, 0).goto(i), h = new Ri(l, o, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !Js(a.active, h.active) || a.point && (!h.point || !ql(a.point, h.point)))
        return !1;
      if (a.to > r)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, r, s = -1) {
    let l = new Ri(e, null, s).goto(t), o = t, a = l.openStart;
    for (; ; ) {
      let h = Math.min(l.to, i);
      if (l.point) {
        let c = l.activeForPoint(l.to), f = l.pointFrom < t ? c.length + 1 : l.point.startSide < 0 ? c.length : Math.min(c.length, a);
        r.point(o, h, l.point, c, f, l.pointRank), a = Math.min(l.openEnd(h), c.length);
      } else h > o && (r.span(o, h, l.active, a), a = l.openEnd(h));
      if (l.to > i)
        return a + (l.point && l.to > i ? 1 : 0);
      o = l.to, l.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new Tt();
    for (let r of e instanceof Hs ? [e] : t ? xd(e) : e)
      i.add(r.from, r.to, r.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return E.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let r = e[i]; r != E.empty; r = r.nextLayer)
        t = new E(r.chunkPos, r.chunk, t, Math.max(r.maxPoint, t.maxPoint));
    return t;
  }
}
E.empty = /* @__PURE__ */ new E([], [], null, -1);
function xd(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (Ks(e, i) > 0)
        return n.slice().sort(Ks);
      e = i;
    }
  return n;
}
E.empty.nextLayer = E.empty;
class Tt {
  finishChunk(e) {
    this.chunks.push(new kd(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new Tt())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let r = e - this.lastTo || i.startSide - this.last.endSide;
    if (r <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(E.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = E.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function qo(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let s of n)
    for (let l = 0; l < s.chunk.length; l++)
      s.chunk[l].maxPoint <= 0 && i.set(s.chunk[l], s.chunkPos[l]);
  let r = /* @__PURE__ */ new Set();
  for (let s of e)
    for (let l = 0; l < s.chunk.length; l++) {
      let o = i.get(s.chunk[l]);
      o != null && (t ? t.mapPos(o) : o) == s.chunkPos[l] && !(t != null && t.touchesRange(o, o + s.chunk[l].length)) && r.add(s.chunk[l]);
    }
  return r;
}
class vc {
  constructor(e, t, i, r = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = r;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let r = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < r) && this.setRangeIndex(r);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class rn {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let r = [];
    for (let s = 0; s < e.length; s++)
      for (let l = e[s]; !l.isEmpty; l = l.nextLayer)
        l.maxPoint >= i && r.push(new vc(l, t, i, s));
    return r.length == 1 ? r[0] : new rn(r);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      ns(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      ns(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), ns(this.heap, 0);
    }
  }
}
function ns(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let r = n[i];
    if (i + 1 < n.length && r.compare(n[i + 1]) >= 0 && (r = n[i + 1], i++), t.compare(r) < 0)
      break;
    n[i] = t, n[e] = r, e = i;
  }
}
class Ri {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = rn.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    Ln(this.active, e), Ln(this.activeTo, e), Ln(this.activeRank, e), this.minActive = Io(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: r, rank: s } = this.cursor;
    for (; t < this.activeRank.length && (s - this.activeRank[t] || r - this.activeTo[t]) > 0; )
      t++;
    jn(this.active, t, i), jn(this.activeTo, t, r), jn(this.activeRank, t, s), e && jn(e, t, this.cursor.from), this.minActive = Io(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let r = this.minActive;
      if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[r] > e) {
          this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
          break;
        }
        this.removeActive(r), i && Ln(i, r);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let s = this.cursor.value;
          if (!s.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let r = i.length - 1; r >= 0 && i[r] < e; r--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function Do(n, e, t, i, r, s) {
  n.goto(e), t.goto(i);
  let l = i + r, o = i, a = i - e, h = !!s.boundChange;
  for (let c = !1; ; ) {
    let f = n.to + a - t.to, u = f || n.endSide - t.endSide, O = u < 0 ? n.to + a : t.to, d = Math.min(O, l);
    if (n.point || t.point ? (n.point && t.point && ql(n.point, t.point) && Js(n.activeForPoint(n.to), t.activeForPoint(t.to)) || s.comparePoint(o, d, n.point, t.point), c = !1) : (c && s.boundChange(o), d > o && !Js(n.active, t.active) && s.compareRange(o, d, n.active, t.active), h && d < l && (f || n.openEnd(O) != t.openEnd(O)) && (c = !0)), O > l)
      break;
    o = O, u <= 0 && n.next(), u >= 0 && t.next();
  }
}
function Js(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !ql(n[t], e[t]))
      return !1;
  return !0;
}
function Ln(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function jn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function Io(n, e) {
  let t = -1, i = 1e9;
  for (let r = 0; r < e.length; r++)
    (e[r] - i || n[r].endSide - n[t].endSide) < 0 && (t = r, i = e[r]);
  return t;
}
function gt(n, e, t = n.length) {
  let i = 0;
  for (let r = 0; r < t && r < n.length; )
    n.charCodeAt(r) == 9 ? (i += e - i % e, r++) : (i++, r = Oe(n, r));
  return i;
}
function wd(n, e, t, i) {
  for (let r = 0, s = 0; ; ) {
    if (s >= e)
      return r;
    if (r == n.length)
      break;
    s += n.charCodeAt(r) == 9 ? t - s % t : 1, r = Oe(n, r);
  }
  return n.length;
}
const el = "ͼ", Go = typeof Symbol > "u" ? "__" + el : Symbol.for(el), tl = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), No = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class ui {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function r(l) {
      return /^@/.test(l) ? [l] : l.split(/,\s*/);
    }
    function s(l, o, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(l[0]), u = f && f[1] == "keyframes";
      if (f && o == null) return a.push(l[0] + ";");
      for (let O in o) {
        let d = o[O];
        if (/&/.test(O))
          s(
            O.split(/,\s*/).map((p) => l.map((g) => p.replace(/&/, g))).reduce((p, g) => p.concat(g)),
            d,
            a
          );
        else if (d && typeof d == "object") {
          if (!f) throw new RangeError("The value of a property (" + O + ") should be a primitive value.");
          s(r(O), d, c, u);
        } else d != null && c.push(O.replace(/_.*/, "").replace(/[A-Z]/g, (p) => "-" + p.toLowerCase()) + ": " + d + ";");
      }
      (c.length || u) && a.push((i && !f && !h ? l.map(i) : l).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let l in e) s(r(l), e[l], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = No[Go] || 1;
    return No[Go] = e + 1, el + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let r = e[tl], s = i && i.nonce;
    r ? s && r.setNonce(s) : r = new $d(e, s), r.mount(Array.isArray(t) ? t : [t], e);
  }
}
let Uo = /* @__PURE__ */ new Map();
class $d {
  constructor(e, t) {
    let i = e.ownerDocument || e, r = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
      let s = Uo.get(i);
      if (s) return e[tl] = s;
      this.sheet = new r.CSSStyleSheet(), Uo.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[tl] = this;
  }
  mount(e, t) {
    let i = this.sheet, r = 0, s = 0;
    for (let l = 0; l < e.length; l++) {
      let o = e[l], a = this.modules.indexOf(o);
      if (a < s && a > -1 && (this.modules.splice(a, 1), s--, a = -1), a == -1) {
        if (this.modules.splice(s++, 0, o), i) for (let h = 0; h < o.rules.length; h++)
          i.insertRule(o.rules[h], r++);
      } else {
        for (; s < a; ) r += this.modules[s++].rules.length;
        r += o.rules.length, s++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let l = "";
      for (let a = 0; a < this.modules.length; a++)
        l += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = l;
      let o = t.head || t;
      this.styleTag.parentNode != o && o.insertBefore(this.styleTag, o.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var Zt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, sn = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Pd = typeof navigator < "u" && /Mac/.test(navigator.platform), vd = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ce = 0; ce < 10; ce++) Zt[48 + ce] = Zt[96 + ce] = String(ce);
for (var ce = 1; ce <= 24; ce++) Zt[ce + 111] = "F" + ce;
for (var ce = 65; ce <= 90; ce++)
  Zt[ce] = String.fromCharCode(ce + 32), sn[ce] = String.fromCharCode(ce);
for (var rs in Zt) sn.hasOwnProperty(rs) || (sn[rs] = Zt[rs]);
function Td(n) {
  var e = Pd && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || vd && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? sn : Zt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let ge = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, il = typeof document < "u" ? document : { documentElement: { style: {} } };
const nl = /* @__PURE__ */ /Edge\/(\d+)/.exec(ge.userAgent), Tc = /* @__PURE__ */ /MSIE \d/.test(ge.userAgent), rl = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ge.userAgent), Wr = !!(Tc || rl || nl), Fo = !Wr && /* @__PURE__ */ /gecko\/(\d+)/i.test(ge.userAgent), ss = !Wr && /* @__PURE__ */ /Chrome\/(\d+)/.exec(ge.userAgent), Ho = "webkitFontSmoothing" in il.documentElement.style, sl = !Wr && /* @__PURE__ */ /Apple Computer/.test(ge.vendor), Ko = sl && (/* @__PURE__ */ /Mobile\/\w+/.test(ge.userAgent) || ge.maxTouchPoints > 2);
var P = {
  mac: Ko || /* @__PURE__ */ /Mac/.test(ge.platform),
  windows: /* @__PURE__ */ /Win/.test(ge.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(ge.platform),
  ie: Wr,
  ie_version: Tc ? il.documentMode || 6 : rl ? +rl[1] : nl ? +nl[1] : 0,
  gecko: Fo,
  gecko_version: Fo ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(ge.userAgent) || [0, 0])[1] : 0,
  chrome: !!ss,
  chrome_version: ss ? +ss[1] : 0,
  ios: Ko,
  android: /* @__PURE__ */ /Android\b/.test(ge.userAgent),
  webkit: Ho,
  webkit_version: Ho ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(ge.userAgent) || [0, 0])[1] : 0,
  safari: sl,
  safari_version: sl ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(ge.userAgent) || [0, 0])[1] : 0,
  tabSize: il.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function Dl(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const gr = /* @__PURE__ */ Object.create(null);
function Il(n, e, t) {
  if (n == e)
    return !0;
  n || (n = gr), e || (e = gr);
  let i = Object.keys(n), r = Object.keys(e);
  if (i.length - 0 != r.length - 0)
    return !1;
  for (let s of i)
    if (s != t && (r.indexOf(s) == -1 || n[s] !== e[s]))
      return !1;
  return !0;
}
function Zd(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function Jo(n, e, t) {
  let i = !1;
  if (e)
    for (let r in e)
      t && r in t || (i = !0, r == "style" ? n.style.cssText = "" : n.removeAttribute(r));
  if (t)
    for (let r in t)
      e && e[r] == t[r] || (i = !0, r == "style" ? n.style.cssText = t[r] : n.setAttribute(r, t[r]));
  return i;
}
function Cd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class Rt {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t, i) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var we = /* @__PURE__ */ (function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
})(we || (we = {}));
class V extends vt {
  constructor(e, t, i, r) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = r;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new yn(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Vt(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, r;
    if (e.isBlockGap)
      i = -5e8, r = 4e8;
    else {
      let { start: s, end: l } = Zc(e, t);
      i = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (l ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new Vt(e, i, r, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new kn(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return E.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
V.none = E.empty;
class yn extends V {
  constructor(e) {
    let { start: t, end: i } = Zc(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Dl(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || gr;
  }
  eq(e) {
    return this == e || e instanceof yn && this.tagName == e.tagName && Il(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
yn.prototype.point = !1;
class kn extends V {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof kn && this.spec.class == e.spec.class && Il(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
kn.prototype.mapMode = me.TrackBefore;
kn.prototype.point = !0;
class Vt extends V {
  constructor(e, t, i, r, s, l) {
    super(t, i, s, e), this.block = r, this.isReplace = l, this.mapMode = r ? t <= 0 ? me.TrackBefore : me.TrackAfter : me.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? we.WidgetRange : this.startSide <= 0 ? we.WidgetBefore : we.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof Vt && Ad(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
Vt.prototype.point = !0;
function Zc(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function Ad(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function si(n, e, t, i = 0) {
  let r = t.length - 1;
  r >= 0 && t[r] + i >= n ? t[r] = Math.max(t[r], e) : t.push(n, e);
}
class ln extends vt {
  constructor(e, t, i) {
    super(), this.tagName = e, this.attributes = t, this.rank = i;
  }
  eq(e) {
    return e == this || e instanceof ln && this.tagName == e.tagName && Il(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new ln(e.tagName, e.attributes || gr, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return E.of(e, t);
  }
}
ln.prototype.startSide = ln.prototype.endSide = -1;
function on(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function ll(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function Fi(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return ll(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function or(n) {
  return n.nodeType == 3 ? an(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Hi(n, e, t, i) {
  return t ? ea(n, e, t, i, -1) || ea(n, e, t, i, 1) : !1;
}
function Ct(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function mr(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function ea(n, e, t, i, r) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (r < 0 ? 0 : mt(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let s = n.parentNode;
      if (!s || s.nodeType != 1)
        return !1;
      e = Ct(n) + (r < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (r < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = r < 0 ? mt(n) : 0;
    } else
      return !1;
  }
}
function mt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Sr(n, e) {
  let { left: t, right: i } = n;
  if (t == i)
    return n;
  let r = e ? t : i;
  return { left: r, right: r, top: n.top, bottom: n.bottom };
}
function Xd(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function Cc(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function Rd(n, e, t, i, r, s, l, o) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, O = c == a.body, d = 1, p = 1;
      if (O)
        u = Xd(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let y = c.getBoundingClientRect();
        ({ scaleX: d, scaleY: p } = Cc(c, y)), u = {
          left: y.left,
          right: y.left + c.clientWidth * d,
          top: y.top,
          bottom: y.top + c.clientHeight * p
        };
      }
      let g = 0, S = 0;
      if (r == "nearest")
        e.top < u.top + l ? (S = e.top - (u.top + l), t > 0 && e.bottom > u.bottom + S && (S = e.bottom - u.bottom + l)) : e.bottom > u.bottom - l && (S = e.bottom - u.bottom + l, t < 0 && e.top - S < u.top && (S = e.top - (u.top + l)));
      else {
        let y = e.bottom - e.top, b = u.bottom - u.top;
        S = (r == "center" && y <= b ? e.top + y / 2 - b / 2 : r == "start" || r == "center" && t < 0 ? e.top - l : e.bottom - b + l) - u.top;
      }
      if (i == "nearest" ? e.left < u.left + s ? (g = e.left - (u.left + s), t > 0 && e.right > u.right + g && (g = e.right - u.right + s)) : e.right > u.right - s && (g = e.right - u.right + s, t < 0 && e.left < u.left + g && (g = e.left - (u.left + s))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == o ? e.left - s : e.right - (u.right - u.left) + s) - u.left, g || S)
        if (O)
          h.scrollBy(g, S);
        else {
          let y = 0, b = 0;
          if (S) {
            let A = c.scrollTop;
            c.scrollTop += S / p, b = (c.scrollTop - A) * p;
          }
          if (g) {
            let A = c.scrollLeft;
            c.scrollLeft += g / d, y = (c.scrollLeft - A) * d;
          }
          e = {
            left: e.left - y,
            top: e.top - b,
            right: e.right - y,
            bottom: e.bottom - b
          }, y && Math.abs(y - g) < 1 && (i = "nearest"), b && Math.abs(b - S) < 1 && (r = "nearest");
        }
      if (O)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function Ac(n, e = !0) {
  let t = n.ownerDocument, i = null, r = null;
  for (let s = n.parentNode; s && !(s == t.body || (!e || i) && r); )
    if (s.nodeType == 1)
      !r && s.scrollHeight > s.clientHeight && (r = s), e && !i && s.scrollWidth > s.clientWidth && (i = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11)
      s = s.host;
    else
      break;
  return { x: i, y: r };
}
class Md {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? mt(t) : 0), i, Math.min(e.focusOffset, i ? mt(i) : 0));
  }
  set(e, t, i, r) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = r;
  }
}
function Xc(n) {
  let e = [];
  for (let t = n; t; t = t.nodeType == 11 ? t.host : t.parentNode)
    t.nodeType == 1 && e.push({ node: t, left: t.scrollLeft, top: t.scrollTop });
  return e;
}
function Rc(n, e = !0) {
  for (let { node: t, left: i, top: r } of n)
    e && t.scrollTop != r && (t.scrollTop = r), t.scrollLeft != i && (t.scrollLeft = i);
}
let Yt = null;
P.safari && P.safari_version >= 26 && (Yt = !1);
function Mc(n) {
  if (n.setActive)
    return n.setActive();
  if (Yt)
    return n.focus(Yt);
  let e = Xc(n);
  n.focus(Yt == null ? {
    get preventScroll() {
      return Yt = { preventScroll: !0 }, !0;
    }
  } : void 0), Yt || (Yt = !1, Rc(e));
}
let ta;
function an(n, e, t = e) {
  let i = ta || (ta = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function li(n, e, t, i) {
  let r = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: r.altKey, ctrlKey: r.ctrlKey, shiftKey: r.shiftKey, metaKey: r.metaKey } = i);
  let s = new KeyboardEvent("keydown", r);
  s.synthetic = !0, n.dispatchEvent(s);
  let l = new KeyboardEvent("keyup", r);
  return l.synthetic = !0, n.dispatchEvent(l), s.defaultPrevented || l.defaultPrevented;
}
function Ld(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function jd(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, mt(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let r = t.childNodes[i - 1];
      r.contentEditable == "false" ? i-- : (t = r, i = mt(t));
    } else {
      if (t == n)
        return !0;
      i = Ct(t), t = t.parentNode;
    }
}
function Lc(n) {
  return n instanceof Window ? n.pageYOffset > Math.max(0, n.document.documentElement.scrollHeight - n.innerHeight - 4) : n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function jc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = mt(t);
    } else if (t.parentNode && !mr(t))
      i = Ct(t), t = t.parentNode;
    else
      return null;
  }
}
function Ec(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !mr(t))
      i = Ct(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class We {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new We(e.parentNode, Ct(e), t);
  }
  static after(e, t) {
    return new We(e.parentNode, Ct(e) + 1, t);
  }
}
var te = /* @__PURE__ */ (function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
})(te || (te = {}));
const qt = te.LTR, Gl = te.RTL;
function Yc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const Ed = /* @__PURE__ */ Yc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Yd = /* @__PURE__ */ Yc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), ol = /* @__PURE__ */ Object.create(null), Ue = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  ol[e] = t, ol[t] = -e;
}
function zc(n) {
  return n <= 247 ? Ed[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? Yd[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const zd = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class tt {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Gl : qt;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, r) {
    let s = -1;
    for (let l = 0; l < e.length; l++) {
      let o = e[l];
      if (o.from <= t && o.to >= t) {
        if (o.level == i)
          return l;
        (s < 0 || (r != 0 ? r < 0 ? o.from < t : o.to > t : e[s].level > o.level)) && (s = l);
      }
    }
    if (s < 0)
      throw new RangeError("Index out of range");
    return s;
  }
}
function _c(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], r = e[t];
    if (i.from != r.from || i.to != r.to || i.direction != r.direction || !_c(i.inner, r.inner))
      return !1;
  }
  return !0;
}
const D = [];
function _d(n, e, t, i, r) {
  for (let s = 0; s <= i.length; s++) {
    let l = s ? i[s - 1].to : e, o = s < i.length ? i[s].from : t, a = s ? 256 : r;
    for (let h = l, c = a, f = a; h < o; h++) {
      let u = zc(n.charCodeAt(h));
      u == 512 ? u = c : u == 8 && f == 4 && (u = 16), D[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
    }
    for (let h = l, c = a, f = a; h < o; h++) {
      let u = D[h];
      if (u == 128)
        h < o - 1 && c == D[h + 1] && c & 24 ? u = D[h] = c : D[h] = 256;
      else if (u == 64) {
        let O = h + 1;
        for (; O < o && D[O] == 64; )
          O++;
        let d = h && c == 8 || O < t && D[O] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let p = h; p < O; p++)
          D[p] = d;
        h = O - 1;
      } else u == 8 && f == 1 && (D[h] = 1);
      c = u, u & 7 && (f = u);
    }
  }
}
function Wd(n, e, t, i, r) {
  let s = r == 1 ? 2 : 1;
  for (let l = 0, o = 0, a = 0; l <= i.length; l++) {
    let h = l ? i[l - 1].to : e, c = l < i.length ? i[l].from : t;
    for (let f = h, u, O, d; f < c; f++)
      if (O = ol[u = n.charCodeAt(f)])
        if (O < 0) {
          for (let p = o - 3; p >= 0; p -= 3)
            if (Ue[p + 1] == -O) {
              let g = Ue[p + 2], S = g & 2 ? r : g & 4 ? g & 1 ? s : r : 0;
              S && (D[f] = D[Ue[p]] = S), o = p;
              break;
            }
        } else {
          if (Ue.length == 189)
            break;
          Ue[o++] = f, Ue[o++] = u, Ue[o++] = a;
        }
      else if ((d = D[f]) == 2 || d == 1) {
        let p = d == r;
        a = p ? 0 : 1;
        for (let g = o - 3; g >= 0; g -= 3) {
          let S = Ue[g + 2];
          if (S & 2)
            break;
          if (p)
            Ue[g + 2] |= 2;
          else {
            if (S & 4)
              break;
            Ue[g + 2] |= 4;
          }
        }
      }
  }
}
function Bd(n, e, t, i) {
  for (let r = 0, s = i; r <= t.length; r++) {
    let l = r ? t[r - 1].to : n, o = r < t.length ? t[r].from : e;
    for (let a = l; a < o; ) {
      let h = D[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == o) {
            if (r == t.length)
              break;
            c = t[r++].to, o = r < t.length ? t[r].from : e;
          } else if (D[c] == 256)
            c++;
          else
            break;
        let f = s == 1, u = (c < e ? D[c] : i) == 1, O = f == u ? f ? 1 : 2 : i;
        for (let d = c, p = r, g = p ? t[p - 1].to : n; d > a; )
          d == g && (d = t[--p].from, g = p ? t[p - 1].to : n), D[--d] = O;
        a = c;
      } else
        s = h, a++;
    }
  }
}
function al(n, e, t, i, r, s, l) {
  let o = i % 2 ? 2 : 1;
  if (i % 2 == r % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == s.length || a < s[h].from) {
        let p = D[a];
        p != o && (c = !1, f = p == 16);
      }
      let u = !c && o == 1 ? [] : null, O = c ? i : i + 1, d = a;
      e: for (; ; )
        if (h < s.length && d == s[h].from) {
          if (f)
            break e;
          let p = s[h];
          if (!c)
            for (let g = p.to, S = h + 1; ; ) {
              if (g == t)
                break e;
              if (S < s.length && s[S].from == g)
                g = s[S++].to;
              else {
                if (D[g] == o)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(p);
          else {
            p.from > a && l.push(new tt(a, p.from, O));
            let g = p.direction == qt != !(O % 2);
            hl(n, g ? i + 1 : i, r, p.inner, p.from, p.to, l), a = p.to;
          }
          d = p.to;
        } else {
          if (d == t || (c ? D[d] != o : D[d] == o))
            break;
          d++;
        }
      u ? al(n, a, d, i + 1, r, u, l) : a < d && l.push(new tt(a, d, O)), a = d;
    }
  else
    for (let a = t, h = s.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > s[h - 1].to) {
        let p = D[a - 1];
        p != o && (c = !1, f = p == 16);
      }
      let u = !c && o == 1 ? [] : null, O = c ? i : i + 1, d = a;
      e: for (; ; )
        if (h && d == s[h - 1].to) {
          if (f)
            break e;
          let p = s[--h];
          if (!c)
            for (let g = p.from, S = h; ; ) {
              if (g == e)
                break e;
              if (S && s[S - 1].to == g)
                g = s[--S].from;
              else {
                if (D[g - 1] == o)
                  break e;
                break;
              }
            }
          if (u)
            u.push(p);
          else {
            p.to < a && l.push(new tt(p.to, a, O));
            let g = p.direction == qt != !(O % 2);
            hl(n, g ? i + 1 : i, r, p.inner, p.from, p.to, l), a = p.from;
          }
          d = p.from;
        } else {
          if (d == e || (c ? D[d - 1] != o : D[d - 1] == o))
            break;
          d--;
        }
      u ? al(n, d, a, i + 1, r, u, l) : d < a && l.push(new tt(d, a, O)), a = d;
    }
}
function hl(n, e, t, i, r, s, l) {
  let o = e % 2 ? 2 : 1;
  _d(n, r, s, i, o), Wd(n, r, s, i, o), Bd(r, s, i, o), al(n, r, s, e, t, i, l);
}
function Vd(n, e, t) {
  if (!n)
    return [new tt(0, 0, e == Gl ? 1 : 0)];
  if (e == qt && !t.length && !zd.test(n))
    return Wc(n.length);
  if (t.length)
    for (; n.length > D.length; )
      D[D.length] = 256;
  let i = [], r = e == qt ? 0 : 1;
  return hl(n, r, r, t, 0, n.length, i), i;
}
function Wc(n) {
  return [new tt(0, n, 0)];
}
let Bc = "";
function qd(n, e, t, i, r) {
  var s;
  let l = i.head - n.from, o = tt.find(e, l, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc), a = e[o], h = a.side(r, t);
  if (l == h) {
    let u = o += r ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[o = u], l = a.side(!r, t), h = a.side(r, t);
  }
  let c = Oe(n.text, l, a.forward(r, t));
  (c < a.from || c > a.to) && (c = h), Bc = n.text.slice(Math.min(l, c), Math.max(l, c));
  let f = o == (r ? e.length - 1 : 0) ? null : e[o + (r ? 1 : -1)];
  return f && c == h && f.level + (r ? 0 : 1) < a.level ? Q.cursor(f.side(!r, t) + n.from, f.forward(r, t) ? 1 : -1, f.level) : Q.cursor(c + n.from, a.forward(r, t) ? -1 : 1, a.level);
}
function Dd(n, e, t) {
  for (let i = e; i < t; i++) {
    let r = zc(n.charCodeAt(i));
    if (r == 1)
      return qt;
    if (r == 2 || r == 4)
      return Gl;
  }
  return qt;
}
const Vc = /* @__PURE__ */ T.define(), qc = /* @__PURE__ */ T.define(), Dc = /* @__PURE__ */ T.define(), Ic = /* @__PURE__ */ T.define(), cl = /* @__PURE__ */ T.define(), Gc = /* @__PURE__ */ T.define(), Nc = /* @__PURE__ */ T.define(), Nl = /* @__PURE__ */ T.define(), Ul = /* @__PURE__ */ T.define(), Uc = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
}), Id = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
}), Fc = /* @__PURE__ */ T.define();
class oi {
  constructor(e, t, i, r, s, l = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = r, this.xMargin = s, this.isSnapshot = l;
  }
  map(e) {
    return e.empty ? this : new oi(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new oi(Q.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const En = /* @__PURE__ */ I.define({ map: (n, e) => n.map(e) }), Hc = /* @__PURE__ */ I.define();
function it(n, e, t) {
  let i = n.facet(Ic);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const ft = /* @__PURE__ */ T.define({ combine: (n) => n.length ? n[0] : !0 });
let Gd = 0;
const ei = /* @__PURE__ */ T.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class At {
  constructor(e, t, i, r, s) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = r, this.baseExtensions = s(this), this.extension = this.baseExtensions.concat(ei.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(ei.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: r, provide: s, decorations: l } = t || {};
    return new At(Gd++, e, i, r, (o) => {
      let a = [];
      return l && a.push(Br.of((h) => {
        let c = h.plugin(o);
        return c ? l(c) : V.none;
      })), s && a.push(s(o)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return At.define((i, r) => new e(i, r), t);
  }
}
class ls {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (it(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        it(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        it(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Kc = /* @__PURE__ */ T.define(), Fl = /* @__PURE__ */ T.define(), Br = /* @__PURE__ */ T.define(), Jc = /* @__PURE__ */ T.define(), Hl = /* @__PURE__ */ T.define(), xn = /* @__PURE__ */ T.define(), ef = /* @__PURE__ */ T.define();
function ia(n, e) {
  let t = n.state.facet(ef);
  if (!t.length)
    return t;
  let i = t.map((s) => s instanceof Function ? s(n) : s), r = [];
  return E.spans(i, e.from, e.to, {
    point() {
    },
    span(s, l, o, a) {
      let h = s - e.from, c = l - e.from, f = r;
      for (let u = o.length - 1; u >= 0; u--, a--) {
        let O = o[u].spec.bidiIsolate, d;
        if (O == null && (O = Dd(e.text, h, c)), a > 0 && f.length && (d = f[f.length - 1]).to == h && d.direction == O)
          d.to = c, f = d.inner;
        else {
          let p = { from: h, to: c, direction: O, inner: [] };
          f.push(p), f = p.inner;
        }
      }
    }
  }), r;
}
const tf = /* @__PURE__ */ T.define();
function nf(n) {
  let e = 0, t = 0, i = 0, r = 0;
  for (let s of n.state.facet(tf)) {
    let l = s(n);
    l && (l.left != null && (e = Math.max(e, l.left)), l.right != null && (t = Math.max(t, l.right)), l.top != null && (i = Math.max(i, l.top)), l.bottom != null && (r = Math.max(r, l.bottom)));
  }
  return { left: e, right: t, top: i, bottom: r };
}
const Wi = /* @__PURE__ */ T.define();
class Le {
  constructor(e, t, i, r) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = r;
  }
  join(e) {
    return new Le(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let r = e[t - 1];
      if (!(r.fromA > i.toA)) {
        if (r.toA < i.fromA)
          break;
        i = i.join(r), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let r = 0, s = 0, l = 0; ; ) {
      let o = r < e.length ? e[r].fromB : 1e9, a = s < t.length ? t[s] : 1e9, h = Math.min(o, a);
      if (h == 1e9)
        break;
      let c = h + l, f = h, u = c;
      for (; ; )
        if (s < t.length && t[s] <= f) {
          let O = t[s + 1];
          s += 2, f = Math.max(f, O);
          for (let d = r; d < e.length && e[d].fromB <= f; d++)
            l = e[d].toA - e[d].toB;
          u = Math.max(u, O + l);
        } else if (r < e.length && e[r].fromB <= f) {
          let O = e[r++];
          f = Math.max(f, O.toB), u = Math.max(u, O.toA), l = O.toA - O.toB;
        } else
          break;
      i.push(new Le(c, u, h, f));
    }
    return i;
  }
}
class Qr {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ie.empty(this.startState.doc.length);
    for (let s of i)
      this.changes = this.changes.compose(s.changes);
    let r = [];
    this.changes.iterChangedRanges((s, l, o, a) => r.push(new Le(s, l, o, a))), this.changedRanges = r;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Qr(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const Nd = [];
class K {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return Nd;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && Zd(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let r of this.children) {
      if (r == e)
        return i;
      i += r.length + r.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t, i) {
    return null;
  }
  domPosFor(e, t) {
    let i = Ct(this.dom), r = this.length ? e > 0 : t > 0;
    return new We(this.parent.dom, i + (r ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof qr)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Vr extends K {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, r, s = (e == null ? void 0 : e.node) == t ? e : null, l = 0;
    for (let o of this.children) {
      if (o.sync(e), l += o.length + o.breakAfter, r = i ? i.nextSibling : t.firstChild, s && r != o.dom && (s.written = !0), o.dom.parentNode == t)
        for (; r && r != o.dom; )
          r = na(r);
      else
        t.insertBefore(o.dom, r);
      i = o.dom;
    }
    for (r = i ? i.nextSibling : t.firstChild, s && r && (s.written = !0); r; )
      r = na(r);
    this.length = l;
  }
}
function na(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class qr extends Vr {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = K.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, r = 0, s = 0; ; )
      if (r == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && s++, r = t.pop();
      } else {
        let l = i.children[r++];
        if (l instanceof Ot)
          t.push(r), i = l, r = 0;
        else {
          let o = s + l.length, a = e(l, s);
          if (a !== void 0)
            return a;
          s = o + l.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, r = -1, s, l = -1;
    if (this.blockTiles((o, a) => {
      let h = a + o.length;
      if (e >= a && e <= h) {
        if (o.isWidget() && t >= -1 && t <= 1) {
          if (o.flags & 32)
            return !0;
          o.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? o.length : o.covers(1))) && (!i || !o.isWidget() && i.isWidget()) && (i = o, r = e - a), (h > e || e == a && (t > 1 ? o.length : o.covers(-1))) && (!s || !o.isWidget() && s.isWidget()) && (s = o, l = e - a);
      }
    }), !i && !s)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !s ? { tile: i, offset: r } : { tile: s, offset: l };
  }
}
class Ot extends Vr {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new Ot(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Oi extends Vr {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let r = new Oi(t || document.createElement("div"), e);
    return (!t || !i) && (r.flags |= 4), r;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  // Side -2/2 is handled specially, in that it allows the position
  // returned to be before (-2) or after (2) widgets that would always
  // be after/before a cursor position.
  resolveInline(e, t, i) {
    let r = null, s = -1, l = null, o = -1;
    function a(c, f) {
      for (let u = 0, O = 0; u < c.children.length && O <= f; u++) {
        let d = c.children[u], p = O + d.length;
        p >= f && (d.isComposite() ? a(d, f - O) : (!l || l.isHidden && (t > 0 && !(l.flags & 32) || i && Fd(l, d))) && (p > f || d.flags & 32 && t <= 1) ? (l = d, o = f - O) : (O < f || d.flags & 16 && !d.isHidden && t >= -1) && (r = d, s = f - O)), O = p;
      }
    }
    a(this, e);
    let h = (t < 0 ? r : l) || r || l;
    return h ? { tile: h, offset: h == r ? s : o } : null;
  }
  coordsIn(e, t, i) {
    let r = this.resolveInline(e, t, !0);
    return r ? r.tile.coordsIn(Math.max(0, r.offset), t, i) : Ud(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: r, offset: s } = i;
      if (this.dom.contains(r.dom))
        return r.isText() ? new We(r.dom, Math.min(r.dom.nodeValue.length, s)) : r.domPosFor(s, r.flags & 16 ? 1 : r.flags & 32 ? -1 : t);
      let l = i.tile.parent, o = !1;
      for (let a of l.children) {
        if (o)
          return new We(a.dom, 0);
        a == i.tile && (o = !0);
      }
    }
    return new We(this.dom, 0);
  }
}
function Ud(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = or(e);
  return t[t.length - 1] || null;
}
function Fd(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class ke extends Vr {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new ke(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Wt extends K {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t, i) {
    let r = this.dom.nodeValue.length;
    e > r && (e = r);
    let s = e, l = e, o = 0;
    e == 0 && t < 0 || e == r && t >= 0 ? P.chrome || P.gecko || (e ? (s--, o = 1) : l < r && (l++, o = -1)) : t < 0 ? s-- : l < r && l++;
    let a = an(this.dom, s, l).getClientRects();
    if (!a.length)
      return null;
    let h = a[(o ? o < 0 : t >= 0) ? 0 : a.length - 1];
    return P.safari && !o && h.width == 0 && (h = Array.prototype.find.call(a, (c) => c.width) || h), i == null ? h : Sr(h, (o ? o > 0 : t < 0) == i);
  }
  static of(e, t) {
    let i = new Wt(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class Dt extends K {
  constructor(e, t, i, r) {
    super(e, t, r), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let r = this.widget.coordsAt(this.dom, e, t);
    if (r)
      return r;
    if (i)
      return Sr(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let s = this.dom.getClientRects(), l = null;
      if (!s.length)
        return null;
      let o = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = o ? s.length - 1 : 0; l = s[a], !(e > 0 ? a == 0 : a == s.length - 1 || l.top < l.bottom); a += o ? -1 : 1)
        ;
      return Sr(l, !o);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return j.empty;
    let { root: e } = this;
    if (!e)
      return j.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, r, s) {
    return s || (s = e.toDOM(t), e.editable || (s.contentEditable = "false")), new Dt(s, i, e, r);
  }
}
class br extends K {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return j.empty;
  }
  coordsIn(e, t, i) {
    let r = this.dom.getBoundingClientRect();
    return i == null ? r : Sr(r, t > 0 == i);
  }
}
class Hd {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: r, index: s, beforeBreak: l, parents: o } = this;
    for (; e || t > 0; )
      if (r.isComposite())
        if (l) {
          if (!e)
            break;
          i && i.break(), e--, l = !1;
        } else if (s == r.children.length) {
          if (!e && !o.length)
            break;
          i && i.leave(r), l = !!r.breakAfter, { tile: r, index: s } = o.pop(), s++;
        } else {
          let a = r.children[s], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (l = !!h, s++, e -= a.length) : (o.push({ tile: r, index: s }), r = a, s = 0, i && a.isComposite() && i.enter(a));
        }
      else {
        let a = r.length;
        if (s < a && e) {
          let h = Math.min(e, a - s);
          i && i.skip(r, s, s + h), e -= h, s += h;
        }
        if (s == a)
          l = !!r.breakAfter, { tile: r, index: s } = o.pop(), s++;
        else if (!e)
          break;
      }
    return this.tile = r, this.index = s, this.beforeBreak = l, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Kd {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = r;
  }
}
class Jd {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, r) {
    var s;
    this.flushBuffer();
    let l = this.ensureMarks(t, i), o = l.lastChild;
    if (o && o.isText() && !(o.flags & 8) && o.length + e.length < 512) {
      this.cache.reused.set(
        o,
        2
        /* Reused.DOM */
      );
      let a = l.children[l.children.length - 1] = new Wt(o.dom, o.text + e);
      a.parent = l;
    } else
      l.append(r || Wt.of(e, (s = this.cache.find(Wt)) === null || s === void 0 ? void 0 : s.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? os(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let r = i;
    for (let o = t.marks.length - 1; o >= 0; o--) {
      let a = t.marks[o], h = r.lastChild;
      if (h instanceof ke && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(os(a.dom)), r = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = K.get(a.dom);
          f && f.setDOM(os(a.dom));
        }
        let c = ke.of(a.mark, a.dom);
        r.append(c), r = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let s = K.get(e.text);
    s && this.cache.reused.set(
      s,
      2
      /* Reused.DOM */
    );
    let l = new Wt(e.text, e.text.nodeValue);
    l.flags |= 8, this.pos = e.range.toB, r.append(l);
  }
  addInlineWidget(e, t, i) {
    let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    r || this.flushBuffer();
    let s = this.ensureMarks(t, i);
    !r && !(e.flags & 16) && s.append(this.getBuffer(1)), s.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = rf);
    let r = Oi.start(e, t || ((i = this.cache.find(Oi)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = r);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let r = this.curLine;
    for (let s = e.length - 1; s >= 0; s--) {
      let l = e[s], o;
      if (t > 0 && (o = r.lastChild) && o instanceof ke && o.mark.eq(l))
        r = o, t--;
      else {
        let a = ke.of(l, (i = this.cache.find(ke, (h) => h.mark.eq(l))) === null || i === void 0 ? void 0 : i.dom);
        r.append(a), r = a, t = 0;
      }
    }
    return r;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !ra(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(P.ios && ra(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        as,
        0,
        32
        /* TileFlag.After */
      ) || new Dt(
        as.toDOM(),
        0,
        as,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = e.rank * 102 + e.value.rank, i = new Kd(e.from, e.to, e.value, t), r = this.wrappers.length;
        for (; r > 0 && (this.wrappers[r - 1].rank - i.rank || this.wrappers[r - 1].to - i.to) < 0; )
          r--;
        this.wrappers.splice(r, 0, i);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let r = t.lastChild;
      if (i.from < this.pos && r instanceof Ot && r.wrapper.eq(i.wrapper))
        t = r;
      else {
        let s = Ot.of(i.wrapper, (e = this.cache.find(Ot, (l) => l.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(s), t = s;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      br,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new br(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class ep {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: r, lineBreak: s, done: l } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, l)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = r;
      let o = this.textOff = Math.min(e, r.length);
      return s ? null : r.slice(0, o);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const yr = [Dt, Oi, Wt, ke, br, Ot, qr];
for (let n = 0; n < yr.length; n++)
  yr[n].bucket = n;
class tp {
  constructor(e) {
    this.view = e, this.buckets = yr.map(() => []), this.index = yr.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let r = e.bucket, s = this.buckets[r], l = this.index[r];
    for (let o = 0; o < s.length; o++) {
      let a = (o + l) % s.length, h = s[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return s.splice(a, 1), a < l && this.index[r]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let r = this.buckets[0];
    if (r.length)
      for (let s = 0, l = 0; ; s++) {
        if (s == r.length) {
          if (l)
            return null;
          l = 1, s = 0;
        }
        let o = r[s];
        if (!this.reused.has(o) && (l == 0 ? o.widget.compare(e) : o.widget.constructor == e.constructor && e.updateDOM(o.dom, this.view, o.widget)))
          return r.splice(s, 1), s < this.index[0] && this.index[0]--, o.widget == e && o.length == t && (o.flags & 497) == i ? (this.reused.set(
            o,
            1
            /* Reused.Full */
          ), o) : (this.reused.set(
            o,
            2
            /* Reused.DOM */
          ), new Dt(o.dom, t, e, o.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class ip {
  constructor(e, t, i, r, s) {
    this.view = e, this.decorations = r, this.disallowBlockEffectsFor = s, this.openWidget = !1, this.openMarks = 0, this.cache = new tp(e), this.text = new ep(e.state.doc), this.builder = new Jd(this.cache, new qr(e, e.contentDOM), E.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Hd(t), this.reuseWalker = {
      skip: (l, o, a) => {
        if (this.cache.add(l), l.isComposite())
          return !1;
      },
      enter: (l) => this.cache.add(l),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let r = 0, s = 0, l = 0; ; ) {
      let o = l < e.length ? e[l++] : null, a = o ? o.fromA : this.old.root.length;
      if (a > r) {
        let h = a - r;
        this.preserve(h, !l, !o), r = a, s += h;
      }
      if (!o)
        break;
      t && o.fromA <= t.range.fromA && o.toA >= t.range.toA ? (this.forward(o.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(s, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, o.toA), this.emit(t.range.toB, o.toB)) : (this.forward(o.fromA, o.toA), this.emit(s, o.toB)), s = o.toB, r = o.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let r = sp(this.old), s = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (l, o, a) => {
        if (l.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - o);
          else {
            let h = a > 0 || o < l.length ? Dt.of(l.widget, this.view, a - o, l.flags & 496, this.cache.maybeReuse(l)) : this.cache.reuse(l);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, r, s), s = r.length);
          }
        else if (l.isText())
          this.builder.ensureLine(null), !o && a == l.length && !this.cache.reused.has(l) ? this.builder.addText(l.text, r, s, this.cache.reuse(l)) : (this.cache.add(l), this.builder.addText(l.text.slice(o, a), r, s)), s = r.length;
        else if (l.isLine())
          l.flags &= -2, this.cache.reused.set(
            l,
            1
            /* Reused.Full */
          ), this.builder.addLine(l);
        else if (l instanceof br)
          this.cache.add(l);
        else if (l instanceof ke)
          this.builder.ensureLine(null), this.builder.addMark(l, r, s), this.cache.reused.set(
            l,
            1
            /* Reused.Full */
          ), s = r.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (l) => {
        l.isLine() ? this.builder.addLineStart(l.attrs, this.cache.maybeReuse(l)) : (this.cache.add(l), l instanceof ke && r.unshift(l.mark)), this.openWidget = !1;
      },
      leave: (l) => {
        l.isLine() ? r.length && (r.length = s = 0) : l instanceof ke && (r.shift(), s = Math.min(s, r.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, r = this.builder, s = -1, l = E.spans(this.decorations, e, t, {
      point: (o, a, h, c, f, u) => {
        if (h instanceof Vt) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(o).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (s = c.length, f > c.length)
            r.continueWidget(a - o);
          else {
            let O = h.widget || (h.block ? di.block : di.inline), d = np(h), p = this.cache.findWidget(O, a - o, d) || Dt.of(O, this.view, a - o, d);
            h.block ? (h.startSide > 0 && r.addLineStartIfNotCovered(i), r.addBlockWidget(p)) : (r.ensureLine(i), r.addInlineWidget(p, c, f));
          }
          i = null;
        } else
          i = rp(i, h);
        a > o && this.text.skip(a - o);
      },
      span: (o, a, h, c) => {
        for (let f = o; f < a; ) {
          let u = this.text.next(Math.min(512, a - f));
          u == null ? (r.addLineStartIfNotCovered(i), r.addBreak(), f++) : (r.ensureLine(i), r.addText(u, h, f == o ? c : h.length), f += u.length), i = null;
        }
        s = h.length;
      }
    });
    s > -1 && (this.openWidget = l > s), this.openWidget || r.addLineStartIfNotCovered(i), this.openMarks = l;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let r = e.parentNode; ; r = r.parentNode) {
      let s = K.get(r);
      if (r == this.view.contentDOM)
        break;
      s instanceof ke ? t.push(s) : s != null && s.isLine() ? i = s : s instanceof Ot || (r.nodeName == "DIV" && !i && r != this.view.contentDOM ? i = new Oi(r, rf) : i || t.push(ke.of(new yn({ tagName: r.nodeName.toLowerCase(), attributes: Cd(r) }), r)));
    }
    return { line: i, marks: t };
  }
}
function ra(n, e) {
  let t = (i) => {
    for (let r of i.children)
      if ((e ? r.isText() : r.length) || t(r))
        return !0;
    return !1;
  };
  return t(n);
}
function np(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const rf = { class: "cm-line" };
function rp(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && Dl(t, n), i && (n.class += " " + i)), n;
}
function sp(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof ke && e.push(i.mark);
  }
  return e;
}
function os(n) {
  let e = K.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class di extends Rt {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
di.inline = /* @__PURE__ */ new di("span");
di.block = /* @__PURE__ */ new di("div");
const as = /* @__PURE__ */ new class extends Rt {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class sa {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = V.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new qr(e, e.contentDOM), this.updateInner([new Le(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let r = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? r = this.domChanged.newSel.head : !dp(e.changes, this.hasComposition) && !e.selectionSet && (r = e.state.selection.main.head));
    let s = r > -1 ? op(this.view, e.changes, r) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      i = new Le(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
    }
    this.hasComposition = s ? { from: s.range.fromB, to: s.range.toB } : null, (P.ie || P.chrome) && !s && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let l = this.decorations, o = this.blockWrappers;
    this.updateDeco();
    let a = cp(l, this.decorations, e.changes);
    a.length && (i = Le.extendWithRanges(i, a));
    let h = up(o, this.blockWrappers, e.changes);
    return h.length && (i = Le.extendWithRanges(i, h)), s && !i.some((c) => c.fromA <= s.range.fromA && c.toA >= s.range.toA) && (i = s.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, s), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let l = this.tile, o = new ip(this.view, l, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && K.get(t.text) && o.cache.reused.set(
          K.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = o.run(e, t), fl(l, o.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let s = P.chrome || P.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(s), s && (s.written || i.selectionRange.focusNode != s.node || !this.tile.dom.contains(s.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let s of this.tile.children)
        s.isWidget() && s.widget instanceof hs && r.push(s.dom);
    i.updateGaps(r);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(Hc) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, r = this.view.root.activeElement, s = r == i, l = !s && !(this.view.state.facet(ft) || i.tabIndex > -1) && Fi(i, this.view.observer.selectionRange) && !(r && i.contains(r));
    if (!(s || t || l))
      return;
    let o = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), P.gecko && a.empty && !this.hasComposition && lp(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = c = new We(u, 0), o = !0;
    }
    let f = this.view.observer.selectionRange;
    (o || !f.focusNode || (!Hi(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Hi(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      P.android && P.chrome && i.contains(f.focusNode) && Op(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let u = on(this.view.root);
      if (u) if (a.empty) {
        if (P.gecko) {
          let O = ap(h.node, h.offset);
          if (O && O != 3) {
            let d = (O == 1 ? jc : Ec)(h.node, h.offset);
            d && (h = new We(d.node, d.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let O = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), O.setEnd(c.node, c.offset), O.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(O);
      }
      l && this.view.root.activeElement == i && (i.blur(), r && r.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new We(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new We(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Hi(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = on(e.root), { anchorNode: r, anchorOffset: s } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let l = this.lineAt(t.head, t.assoc);
    if (!l)
      return;
    let o = l.posAtStart;
    if (t.head == o || t.head == o + l.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(r, s);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let r = i.posAtStart;
    if (i.isComposite()) {
      let s;
      if (e == i.dom)
        s = i.dom.childNodes[t];
      else {
        let l = mt(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let o = e.parentNode;
          if (o == i.dom)
            break;
          l == 0 && o.firstChild != o.lastChild && (e == o.firstChild ? l = -1 : l = 1), e = o;
        }
        l < 0 ? s = e : s = e.nextSibling;
      }
      if (s == i.dom.firstChild)
        return r;
      for (; s && !K.get(s); )
        s = s.nextSibling;
      if (!s)
        return r + i.length;
      for (let l = 0, o = r; ; l++) {
        let a = i.children[l];
        if (a.dom == s)
          return o;
        o += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? r + t : r + (t ? i.length : 0) : r;
  }
  domAtPos(e, t) {
    let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(r, t) : i.domIn(r, t);
  }
  inlineDOMNearPos(e, t) {
    let i, r = -1, s = !1, l, o = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (s = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (i = h, r = e - c, s = f < e), f >= e && !l && (l = h, o = e - c, a = c > e), c > e && l)
          return !0;
      }
    }), !i && !l ? this.domAtPos(e, t) : (s && l ? i = null : a && i && (l = null), i && t < 0 || !l ? i.domIn(r, t) : l.domIn(o, t));
  }
  // Get the coord of the element at the given side of the given
  // position. If rtl is given, flatten it using that text direction.
  coordsAt(e, t, i) {
    let { tile: r, offset: s } = this.tile.resolveBlock(e, t);
    return r.isWidget() ? r.widget instanceof hs ? null : r.coordsInWidget(s, t, !0) : r.coordsIn(s, t, i);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function r(s, l) {
      if (s.isComposite())
        for (let o of s.children) {
          if (o.length >= l) {
            let a = r(o, l);
            if (a)
              return a;
          }
          if (l -= o.length, l < 0)
            break;
        }
      else if (s.isText() && l < s.length) {
        let o = Oe(s.text, l);
        if (o == l)
          return null;
        let a = an(s.dom, l, o).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return r(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: r } = e, s = this.view.contentDOM.clientWidth, l = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, o = -1, a = this.view.textDirection == te.LTR, h = 0, c = (f, u, O) => {
      for (let d = 0; d < f.children.length && !(u > r); d++) {
        let p = f.children[d], g = u + p.length, S = p.dom.getBoundingClientRect(), { height: y } = S;
        if (O && !d && (h += S.top - O.top), p instanceof Ot)
          g > i && c(p, u, S);
        else if (u >= i && (h > 0 && t.push(-h), t.push(y + h), h = 0, l)) {
          let b = p.dom.lastChild, A = b ? or(b) : [];
          if (A.length) {
            let $ = A[A.length - 1], v = a ? $.right - S.left : S.right - $.left;
            v > o && (o = v, this.minWidth = s, this.minWidthFrom = u, this.minWidthTo = g);
          }
        }
        O && d == f.children.length - 1 && (h += O.bottom - S.bottom), u = g + p.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? te.RTL : te.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((l) => {
      if (l.isLine() && l.children.length && l.length <= 20) {
        let o = 0, a;
        for (let h of l.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = or(h.dom);
          if (c.length != 1)
            return;
          o += c[0].width, a = c[0].height;
        }
        if (o)
          return {
            lineHeight: l.dom.getBoundingClientRect().height,
            charWidth: o / l.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, r, s;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let l = or(t.firstChild)[0];
      i = t.getBoundingClientRect().height, r = l && l.width ? l.width / 27 : 7, s = l && l.height ? l.height : i, t.remove();
    }), { lineHeight: i, charWidth: r, textHeight: s };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, r = 0; ; r++) {
      let s = r == t.viewports.length ? null : t.viewports[r], l = s ? s.from - 1 : this.view.state.doc.length;
      if (l > i) {
        let o = (t.lineBlockAt(l).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(V.replace({
          widget: new hs(o),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, l));
      }
      if (!s)
        break;
      i = s.to + 1;
    }
    return V.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Br).map((s) => (this.dynamicDecorationMap[e++] = typeof s == "function") ? s(this.view) : s), i = !1, r = this.view.state.facet(Hl).map((s, l) => {
      let o = typeof s == "function";
      return o && (i = !0), o ? s(this.view) : s;
    });
    for (r.length && (this.dynamicDecorationMap[e++] = i, t.push(E.join(r))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(Jc).map((s) => typeof s == "function" ? s(this.view) : s);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(Fc))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        it(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), r;
    if (!i)
      return;
    !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, r.left),
      top: Math.min(i.top, r.top),
      right: Math.max(i.right, r.right),
      bottom: Math.max(i.bottom, r.bottom)
    });
    let s = nf(this.view), l = {
      left: i.left - s.left,
      top: i.top - s.top,
      right: i.right + s.right,
      bottom: i.bottom + s.bottom
    }, { offsetWidth: o, offsetHeight: a } = this.view.scrollDOM;
    if (Rd(this.view.scrollDOM, l, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, o), -o), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == te.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      if (h) {
        let c = Xc(h.dom);
        h.dom.scrollIntoView({ block: "nearest" }), Rc(c, !1);
      }
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    fl(this.tile);
  }
}
function fl(n, e) {
  let t = e == null ? void 0 : e.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      fl(i, e);
  }
}
function lp(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function sf(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = jc(t.focusNode, t.focusOffset), r = Ec(t.focusNode, t.focusOffset), s = i || r;
  if (r && i && r.node != i.node) {
    let o = K.get(r.node);
    if (!o || o.isText() && o.text != r.node.nodeValue)
      s = r;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = K.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (s = r);
    }
  }
  if (n.docView.lastCompositionAfterCursor = s != i, !s)
    return null;
  let l = e - s.offset;
  return { from: l, to: l + s.node.nodeValue.length, node: s.node };
}
function op(n, e, t) {
  let i = sf(n, t);
  if (!i)
    return null;
  let { node: r, from: s, to: l } = i, o = r.nodeValue;
  if (/[\n\r]/.test(o) || n.state.doc.sliceString(i.from, i.to) != o)
    return null;
  let a = e.invertedDesc;
  return { range: new Le(a.mapPos(s), a.mapPos(l), s, l), text: r };
}
function ap(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let hp = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    si(e, t, this.changes);
  }
  comparePoint(e, t) {
    si(e, t, this.changes);
  }
  boundChange(e) {
    si(e, e, this.changes);
  }
};
function cp(n, e, t) {
  let i = new hp();
  return E.compare(n, e, t, i), i.changes;
}
class fp {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    si(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    si(e, e, this.changes);
  }
}
function up(n, e, t) {
  let i = new fp();
  return E.compare(n, e, t, i), i.changes;
}
function Op(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function dp(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, r) => {
    i < e.to && r > e.from && (t = !0);
  }), t;
}
class hs extends Rt {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function pp(n, e, t = 1) {
  let i = n.charCategorizer(e), r = n.doc.lineAt(e), s = e - r.from;
  if (r.length == 0)
    return Q.cursor(e);
  s == 0 ? t = 1 : s == r.length && (t = -1);
  let l = s, o = s;
  t < 0 ? l = Oe(r.text, s, !1) : o = Oe(r.text, s);
  let a = i(r.text.slice(l, o));
  for (; l > 0; ) {
    let h = Oe(r.text, l, !1);
    if (i(r.text.slice(h, l)) != a)
      break;
    l = h;
  }
  for (; o < r.length; ) {
    let h = Oe(r.text, o);
    if (i(r.text.slice(o, h)) != a)
      break;
    o = h;
  }
  return Q.undirectionalRange(l + r.from, o + r.from);
}
function gp(n, e, t, i, r) {
  let s = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let o = n.viewState.heightOracle.textHeight, a = Math.floor((r - t.top - (n.defaultLineHeight - o) * 0.5) / o);
    s += a * n.viewState.heightOracle.lineLength;
  }
  let l = n.state.sliceDoc(t.from, t.to);
  return t.from + wd(l, s, n.state.tabSize);
}
function mp(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let r;
    for (let s of i.type) {
      if (s.from > e)
        break;
      if (!(s.to < e)) {
        if (s.from < e && s.to > e)
          return s;
        (!r || s.type == we.Text && (r.type != s.type || (t < 0 ? s.from < e : s.to > e))) && (r = s);
      }
    }
    return r || i;
  }
  return i;
}
function Sp(n, e, t, i) {
  let r = mp(n, e.head, e.assoc || -1), s = !i || r.type != we.Text || !(n.lineWrapping || r.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
  if (s) {
    let l = n.dom.getBoundingClientRect(), o = n.textDirectionAt(r.from), a = n.posAtCoords({
      x: t == (o == te.LTR) ? l.right - 1 : l.left + 1,
      y: (s.top + s.bottom) / 2
    });
    if (a != null)
      return Q.cursor(a, t ? -1 : 1);
  }
  return Q.cursor(t ? r.to : r.from, t ? -1 : 1);
}
function la(n, e, t, i) {
  let r = n.state.doc.lineAt(e.head), s = n.bidiSpans(r), l = n.textDirectionAt(r.from);
  for (let o = e, a = null; ; ) {
    let h = qd(r, s, l, o, t), c = Bc;
    if (!h) {
      if (r.number == (t ? n.state.doc.lines : 1))
        return o;
      c = `
`, r = n.state.doc.line(r.number + (t ? 1 : -1)), s = n.bidiSpans(r), h = n.visualLineSide(r, !t);
    }
    if (a) {
      if (!a(c))
        return o;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    o = h;
  }
}
function Qp(n, e, t) {
  let i = n.state.charCategorizer(e), r = i(t);
  return (s) => {
    let l = i(s);
    return r == ut.Space && (r = l), r == l;
  };
}
function bp(n, e, t, i) {
  let r = e.head, s = t ? 1 : -1;
  if (r == (t ? n.state.doc.length : 0))
    return Q.cursor(r, e.assoc);
  let l = e.goalColumn, o, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(r, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), c = n.documentTop;
  if (h)
    l == null && (l = h.left - a.left), o = s < 0 ? h.top : h.bottom;
  else {
    let d = n.viewState.lineBlockAt(r);
    l == null && (l = Math.min(a.right - a.left, n.defaultCharacterWidth * (r - d.from))), o = (s < 0 ? d.top : d.bottom) + c;
  }
  let f = a.left + l, u = n.viewState.heightOracle.textHeight >> 1, O = i ?? u;
  for (let d = 0; ; d += u) {
    let p = o + (O + d) * s, g = ul(n, { x: f, y: p }, !1, s);
    if (t ? p > a.bottom : p < a.top)
      return Q.cursor(g.pos, g.assoc);
    let S = n.coordsAtPos(g.pos, g.assoc), y = S ? (S.top + S.bottom) / 2 : 0;
    if (!S || (t ? y > o : y < o))
      return Q.cursor(g.pos, g.assoc, void 0, l);
  }
}
function Ki(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let r of n)
      r.between(e - 1, e + 1, (s, l, o) => {
        if (e > s && e < l) {
          let a = i || t || (e - s < l - e ? -1 : 1);
          e = a < 0 ? s : l, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function lf(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let r = e.ranges[i], s = null;
    if (r.empty) {
      let l = Ki(n, r.from, 0);
      l != r.from && (s = Q.cursor(l, -1));
    } else {
      let l = Ki(n, r.from, -1), o = Ki(n, r.to, 1);
      (l != r.from || o != r.to) && (r.undirectional ? s = Q.undirectionalRange(r.from, r.to) : s = Q.range(r.from == r.anchor ? l : o, r.from == r.head ? l : o));
    }
    s && (t || (t = e.ranges.slice()), t[i] = s);
  }
  return t ? Q.create(t, e.mainIndex) : e;
}
function cs(n, e, t) {
  let i = Ki(n.state.facet(xn).map((r) => r(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : Q.cursor(i, i < t.from ? 1 : -1);
}
class et {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function ul(n, e, t, i) {
  let r = n.contentDOM.getBoundingClientRect(), s = r.top + n.viewState.paddingTop, { x: l, y: o } = e, a = o - s, h;
  for (; ; ) {
    if (a < 0)
      return new et(0, 1);
    if (a > n.viewState.docHeight)
      return new et(n.state.doc.length, -1);
    if (h = n.elementAtHeight(a), i == null)
      break;
    if (h.type == we.Text) {
      if (i < 0 ? h.to < n.viewport.from : h.from > n.viewport.to)
        break;
      let u = n.docView.coordsAt(i < 0 ? h.from : h.to, i > 0 ? -1 : 1);
      if (u && (i < 0 ? u.top <= a + s : u.bottom >= a + s))
        break;
    }
    let f = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + f : h.top - f;
  }
  if (n.viewport.from >= h.to || n.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == we.Text) {
      let f = gp(n, r, h, l, o);
      return new et(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != we.Text)
    return a < (h.top + h.bottom) / 2 ? new et(h.from, 1) : new et(h.to, -1);
  let c = n.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = n.docView.lineAt(h.from, -2)), new yp(n, l, o, n.textDirectionAt(h.from)).scanTile(c, h.from);
}
class yp {
  constructor(e, t, i, r) {
    this.view = e, this.x = t, this.y = i, this.baseDir = r, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[tt.find(r, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[tt.find(r, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: r } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + r.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically and is closest horizontally. The caller is responsible
  // for dividing its content into N pieces, and pass an array with
  // N+1 positions (including the position after the last piece). For
  // a text tile, these will be character clusters, for a composite
  // tile, these will be child tiles.
  scan(e, t, i = !1) {
    let r = 0, s = e.length - 1, l = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[s]), a, h, c = -1, f = 1e9, u;
    e: for (; r < s; ) {
      let d = s - r, p = r + s >> 1;
      t: if (l.has(p)) {
        for (let y = 1; y < d; y++) {
          let b = p + y;
          if (b >= s && (b -= d), !l.has(b)) {
            p = b;
            break t;
          }
        }
        break e;
      }
      l.add(p);
      let g = t(p), S = 0;
      if (g)
        for (let y = 0; y < g.length; y++) {
          let b = g[y];
          if (!(b.width == 0 && g.length > 1))
            if (b.bottom < this.y)
              (!a || a.bottom < b.bottom) && (a = b), S = 1;
            else if (b.top > this.y)
              (!h || h.top > b.top) && (h = b), S = -1;
            else {
              let A = b.left > this.x ? this.x - b.left : b.right < this.x ? this.x - b.right : 0, $ = Math.abs(A);
              $ < f && (c = p, f = $, u = b), A && (S = A < 0 == (this.baseDir == te.LTR) ? -1 : 1);
            }
        }
      S == -1 && (!o || this.baseDirAt(e[p], 1)) ? s = p : S == 1 && (!o || this.baseDirAt(e[p + 1], -1)) && (r = p + 1);
    }
    if (!u) {
      if (!h && !a)
        return { i: e[0], after: !1 };
      let d = a && (!h || this.y - a.bottom < h.top - this.y) ? a : h;
      return this.y = (d.top + d.bottom) / 2, this.scan(e, t, !0);
    }
    if (f && !i) {
      let { top: d, bottom: p } = u;
      if (a && a.bottom > (d + d + p) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (d + p + p) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let O = (o ? this.dirAt(e[c], 1) : this.baseDir) == te.LTR;
    return {
      i: c,
      // Test whether x is closes to the start or end of this element
      after: this.x > (u.left + u.right) / 2 == O
    };
  }
  scanText(e, t) {
    let i = [];
    for (let s = 0; s < e.length; s = Oe(e.text, s))
      i.push(t + s);
    i.push(t + e.length);
    let r = this.scan(i, (s) => {
      let l = i[s] - t, o = i[s + 1] - t;
      return an(e.dom, l, o).getClientRects();
    });
    return r.after ? new et(i[r.i + 1], -1) : new et(i[r.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new et(t, 1);
    if (e.children.length == 1) {
      let o = e.children[0];
      if (o.isText())
        return this.scanText(o, t);
      if (o.isComposite())
        return this.scanTile(o, t);
    }
    let i = [t];
    for (let o = 0, a = t; o < e.children.length; o++)
      i.push(a += e.children[o].length);
    let r = this.scan(i, (o) => {
      let a = e.children[o];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : an(a.dom, 0, a.length)).getClientRects();
    }), s = e.children[r.i], l = i[r.i];
    return s.isText() ? this.scanText(s, l) : s.isComposite() ? this.scanTile(s, l) : r.after ? new et(i[r.i + 1], -1) : new et(l, 1);
  }
}
const Jt = "￿";
class kp {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(z.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Jt;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let r = e; ; ) {
      this.findPointBefore(i, r);
      let s = this.text.length;
      this.readNode(r);
      let l = K.get(r), o = r.nextSibling;
      if (o == t) {
        l != null && l.breakAfter && !o && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = K.get(o);
      (l && a ? l.breakAfter : (l ? l.breakAfter : mr(r)) || mr(o) && (r.nodeName != "BR" || l != null && l.isWidget()) && this.text.length > s) && !wp(o, t) && this.lineBreak(), r = o;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, r = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let s = -1, l = 1, o;
      if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, i), l = this.lineSeparator.length) : (o = r.exec(t)) && (s = o.index, l = o[0].length), this.append(t.slice(i, s < 0 ? t.length : s)), s < 0)
        break;
      if (this.lineBreak(), l > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= l - 1);
      i = s + l;
    }
  }
  readNode(e) {
    let t = K.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let r = i.iter(); !r.next().done; )
        r.lineBreak ? this.lineBreak() : this.append(r.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (xp(e, i.node, i.offset) ? t : 0));
  }
}
function xp(n, e, t) {
  for (; ; ) {
    if (!e || t < mt(e))
      return !1;
    if (e == n)
      return !0;
    t = Ct(e) + 1, e = e.parentNode;
  }
}
function wp(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = K.get(n);
    if (!(i != null && i.isWidget()))
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let r = i.overrideDOMText;
      if (r != null && r.length)
        return !1;
    }
  return !0;
}
class oa {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class $p {
  constructor(e, t, i, r) {
    this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: s, impreciseAnchor: l } = e.docView, o = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = of(e.docView.tile, t, i, 0))) {
      let a = s || l ? [] : vp(e), h = new kp(a, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = Tp(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, h = s && s.node == a.focusNode && s.offset == a.focusOffset || !ll(e.contentDOM, a.focusNode) ? o.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), c = l && l.node == a.anchorNode && l.offset == a.anchorOffset || !ll(e.contentDOM, a.anchorNode) ? o.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), f = e.viewport;
      if ((P.ios || P.chrome) && h != c && Math.min(h, c) <= o.main.from && Math.max(h, c) >= o.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
        let u = Math.min(h, c), O = Math.max(h, c), d = f.from - u, p = f.to - O;
        (d == 0 || d == 1 || u == 0) && (p == 0 || p == -1 || O == e.state.doc.length) && (h = 0, c = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && o.ranges.length > 1)
        this.newSel = o.replaceRange(Q.range(c, h));
      else if (e.lineWrapping && c == h && !(o.main.empty && o.main.head == h) && e.inputState.lastTouchTime > Date.now() - 100) {
        let u = e.coordsAtPos(h, -1), O = 0;
        u && (O = e.inputState.lastTouchY <= u.bottom ? -1 : 1), this.newSel = Q.create([Q.cursor(h, O)]);
      } else
        this.newSel = Q.single(c, h);
    }
  }
}
function of(n, e, t, i) {
  if (n.isComposite()) {
    let r = -1, s = -1, l = -1, o = -1;
    for (let a = 0, h = i, c = i; a < n.children.length; a++) {
      let f = n.children[a], u = h + f.length;
      if (h < e && u > t)
        return of(f, e, t, h);
      if (u >= e && r == -1 && (r = a, s = h), h > t && f.dom.parentNode == n.dom) {
        l = a, o = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: s,
      to: o < 0 ? i + n.length : o,
      startDOM: (r ? n.children[r - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: l < n.children.length && l >= 0 ? n.children[l].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function af(n, e) {
  let t, { newSel: i } = e, { state: r } = n, s = r.selection.main, l = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: o, to: a } = e.bounds, h = s.from, c = null;
    (l === 8 || P.android && e.text.length < a - o) && (h = s.to, c = "end");
    let f = r.doc.sliceString(o, a, Jt), u, O;
    !s.empty && s.from >= o && s.to <= a && (e.typeOver || f != e.text) && f.slice(0, s.from - o) == e.text.slice(0, s.from - o) && f.slice(s.to - o) == e.text.slice(u = e.text.length - (f.length - (s.to - o))) ? t = {
      from: s.from,
      to: s.to,
      insert: j.of(e.text.slice(s.from - o, u).split(Jt))
    } : (O = hf(f, e.text, h - o, c)) && (P.chrome && l == 13 && O.toB == O.from + 2 && e.text.slice(O.from, O.toB) == Jt + Jt && O.toB--, t = {
      from: o + O.from,
      to: o + O.toA,
      insert: j.of(e.text.slice(O.from, O.toB).split(Jt))
    });
  } else i && (!n.hasFocus && r.facet(ft) || kr(i, s)) && (i = null);
  if (!t && !i)
    return !1;
  if ((P.mac || P.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = Q.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: j.of([t.insert.toString().replace(".", " ")]) }) : r.doc.lineAt(s.from).to < s.to && n.docView.lineHasWidget(s.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: s.from,
    to: s.to,
    insert: r.toText(n.inputState.insertingText)
  } : P.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = Q.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: j.of([" "]) }), t)
    return Kl(n, t, i, l);
  if (i && !kr(i, s)) {
    let o = !1, a = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), a = n.inputState.lastSelectionOrigin, a == "select.pointer" && (i = lf(r.facet(xn).map((h) => h(n)), i))), n.dispatch({ selection: i, scrollIntoView: o, userEvent: a }), !0;
  } else
    return !1;
}
function Kl(n, e, t, i = -1) {
  if (P.ios && n.inputState.flushIOSKey(e))
    return !0;
  let r = n.state.selection.main;
  if (P.android && (e.to == r.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == r.from || e.from == r.from - 1 && n.state.sliceDoc(e.from, r.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && li(n.contentDOM, "Enter", 13) || (e.from == r.from - 1 && e.to == r.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > r.head) && li(n.contentDOM, "Backspace", 8) || e.from == r.from && e.to == r.to + 1 && e.insert.length == 0 && li(n.contentDOM, "Delete", 46)))
    return !0;
  let s = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let l, o = () => l || (l = Pp(n, e, t));
  return n.state.facet(Gc).some((a) => a(n, e.from, e.to, s, o)) || n.dispatch(o()), !0;
}
function Pp(n, e, t) {
  let i, r = n.state, s = r.selection.main, l = -1;
  if (e.from == e.to && e.from < s.from || e.from > s.to) {
    let a = e.from < s.from ? -1 : 1, h = a < 0 ? s.from : s.to, c = Ki(r.facet(xn).map((f) => f(n)), h, a);
    e.from == c && (l = c);
  }
  if (l > -1)
    i = {
      changes: e,
      selection: Q.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= s.from && e.to <= s.to && e.to - e.from >= (s.to - s.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = s.from < e.from ? r.sliceDoc(s.from, e.from) : "", h = s.to > e.to ? r.sliceDoc(e.to, s.to) : "";
    i = r.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h));
  } else {
    let a = r.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (r.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= s.to + 10 && e.to >= s.to - 10) {
      let c = n.state.sliceDoc(e.from, e.to), f, u = t && sf(n, t.main.head);
      if (u) {
        let d = e.insert.length - (e.to - e.from);
        f = { from: u.from, to: u.to - d };
      } else
        f = n.state.doc.lineAt(s.head);
      let O = s.to - e.to;
      i = r.changeByRange((d) => {
        if (d.from == s.from && d.to == s.to)
          return { changes: a, range: h || d.map(a) };
        let p = d.to - O, g = p - c.length;
        if (n.state.sliceDoc(g, p) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        p >= f.from && g <= f.to)
          return { range: d };
        let S = r.changes({ from: g, to: p, insert: e.insert }), y = d.to - s.to;
        return {
          changes: S,
          range: h ? Q.range(Math.max(0, h.anchor + y), Math.max(0, h.head + y)) : d.map(S)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && r.selection.replaceRange(h)
      };
  }
  let o = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, o += ".compose", n.inputState.compositionFirstChange && (o += ".start", n.inputState.compositionFirstChange = !1)), r.update(i, { userEvent: o, scrollIntoView: !0 });
}
function hf(n, e, t, i) {
  let r = Math.min(n.length, e.length), s = 0;
  for (; s < r && n.charCodeAt(s) == e.charCodeAt(s); )
    s++;
  if (s == r && n.length == e.length)
    return null;
  let l = n.length, o = e.length;
  for (; l > 0 && o > 0 && n.charCodeAt(l - 1) == e.charCodeAt(o - 1); )
    l--, o--;
  if (i == "end") {
    let a = Math.max(0, s - Math.min(l, o));
    t -= l + a - s;
  }
  if (l < s && n.length < e.length) {
    let a = t <= s && t >= l ? s - t : 0;
    s -= a, o = s + (o - l), l = s;
  } else if (o < s) {
    let a = t <= s && t >= o ? s - t : 0;
    s -= a, l = s + (l - o), o = s;
  }
  return { from: s, toA: l, toB: o };
}
function vp(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s } = n.observer.selectionRange;
  return t && (e.push(new oa(t, i)), (r != t || s != i) && e.push(new oa(r, s))), e;
}
function Tp(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? Q.single(t + e, i + e) : null;
}
function kr(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class Zp {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, P.safari && e.contentDOM.addEventListener("input", () => null), P.gecko && Dp(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !Yp(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let r of i.observers)
        r(this.view, t);
      for (let r of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (r(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = Ap(e), i = this.handlers, r = this.view.contentDOM;
    for (let s in t)
      if (s != "scroll") {
        let l = !t[s].handlers.length, o = i[s];
        o && l != !o.handlers.length && (r.removeEventListener(s, this.handleEvent), o = null), o || r.addEventListener(s, this.handleEvent, { passive: l });
      }
    for (let s in i)
      s != "scroll" && !t[s] && r.removeEventListener(s, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && ff.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), P.android && P.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (P.ios && !e.synthetic && !e.altKey && !e.metaKey && (cf.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || Xp.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && P.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Cp(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, li(this.view.contentDOM, t.key, t.keyCode, t.mods));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : P.safari && !P.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Cp(n) {
  return n.visualViewport ? n.visualViewport.height * n.visualViewport.scale / n.document.documentElement.clientHeight < 0.85 : !1;
}
function aa(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (r) {
      it(t.state, r);
    }
  };
}
function Ap(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let r = i.spec, s = r && r.plugin.domEventHandlers, l = r && r.plugin.domEventObservers;
    if (s)
      for (let o in s) {
        let a = s[o];
        a && t(o).handlers.push(aa(i.value, a));
      }
    if (l)
      for (let o in l) {
        let a = l[o];
        a && t(o).observers.push(aa(i.value, a));
      }
  }
  for (let i in De)
    t(i).handlers.push(De[i]);
  for (let i in be)
    t(i).observers.push(be[i]);
  return e;
}
const cf = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Xp = "dthko", ff = [16, 17, 18, 20, 91, 92, 224, 225], Yn = 6;
function zn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function Rp(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class Mp {
  constructor(e, t, i, r) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = r, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = Ac(e.contentDOM), this.atoms = e.state.facet(xn).map((l) => l(e));
    let s = e.contentDOM.ownerDocument;
    s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(z.allowMultipleSelections) && Lp(e, t), this.dragging = Ep(e, t) && df(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Rp(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, r = 0, s = 0, l = this.view.win.innerWidth, o = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: r, right: l } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: s, bottom: o } = this.scrollParents.y.getBoundingClientRect());
    let a = nf(this.view);
    e.clientX - a.left <= r + Yn ? t = -zn(r - e.clientX) : e.clientX + a.right >= l - Yn && (t = zn(e.clientX - l)), e.clientY - a.top <= s + Yn ? i = -zn(s - e.clientY) : e.clientY + a.bottom >= o - Yn && (i = zn(e.clientY - o)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = lf(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Lp(n, e) {
  let t = n.state.facet(Vc);
  return t.length ? t[0](e) : P.mac ? e.metaKey : e.ctrlKey;
}
function jp(n, e) {
  let t = n.state.facet(qc);
  return t.length ? t[0](e) : P.mac ? !e.altKey : !e.ctrlKey;
}
function Ep(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = on(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let r = i.getRangeAt(0).getClientRects();
  for (let s = 0; s < r.length; s++) {
    let l = r[s];
    if (l.left <= e.clientX && l.right >= e.clientX && l.top <= e.clientY && l.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function Yp(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = K.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const De = /* @__PURE__ */ Object.create(null), be = /* @__PURE__ */ Object.create(null), uf = P.ie && P.ie_version < 15 || P.ios && P.webkit_version < 604;
function zp(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), Of(n, t.value);
  }, 50);
}
function Dr(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function Of(n, e) {
  e = Dr(n.state, Nl, e);
  let { state: t } = n, i, r = 1, s = t.toText(e), l = s.lines == t.selection.ranges.length;
  if (Ol != null && t.selection.ranges.every((a) => a.empty) && Ol == s.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((l ? s.line(r++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: Q.cursor(h.from + f.length)
      };
    });
  } else l ? i = t.changeByRange((a) => {
    let h = s.line(r++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: Q.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(s);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
be.scroll = (n) => {
  let e = n.inputState;
  e.lastScrollTop = n.scrollDOM.scrollTop, e.lastScrollLeft = n.scrollDOM.scrollLeft, P.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
be.wheel = be.mousewheel = (n) => {
  n.inputState.lastWheelEvent = Date.now();
};
De.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
be.touchstart = (n, e) => {
  let t = n.inputState, i = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), i && (t.lastTouchX = i.clientX, t.lastTouchY = i.clientY), t.setSelectionOrigin("select.pointer");
};
be.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
be.touchend = (n, e) => {
  n.inputState.touchActive = !1;
};
De.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(Dc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = Wp(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new Mp(n, e, t, i)), i && n.observer.ignore(() => {
      Mc(n.contentDOM);
      let s = n.root.activeElement;
      s && !s.contains(n.contentDOM) && s.blur();
    });
    let r = n.inputState.mouseSelection;
    if (r)
      return r.start(e), r.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function ha(n, e, t, i) {
  if (i == 1)
    return Q.cursor(e, t);
  if (i == 2)
    return pp(n.state, e, t);
  {
    let r = n.docView.lineAt(e, t), s = n.state.doc.lineAt(r ? r.posAtEnd : e), l = r ? r.posAtStart : s.from, o = r ? r.posAtEnd : s.to;
    return o < n.state.doc.length && o == s.to && o++, Q.undirectionalRange(l, o);
  }
}
const _p = P.ie && P.ie_version <= 11;
let ca = null, fa = 0, ua = 0;
function df(n) {
  if (!_p)
    return n.detail;
  let e = ca, t = ua;
  return ca = n, ua = Date.now(), fa = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (fa + 1) % 3 : 1;
}
function Wp(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = df(e), r = n.state.selection;
  return {
    update(s) {
      s.docChanged && (t.pos = s.changes.mapPos(t.pos), r = r.map(s.changes));
    },
    get(s, l, o) {
      let a = n.posAndSideAtCoords({ x: s.clientX, y: s.clientY }, !1), h, c = ha(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !l) {
        let f = ha(n, t.pos, t.assoc, i), u = Math.min(f.from, c.from), O = Math.max(f.to, c.to);
        c = u < c.from ? Q.range(u, O, c.assoc) : Q.range(O, u, c.assoc);
      }
      return l ? r.replaceRange(r.main.extend(c.from, c.to, c.assoc)) : o && i == 1 && r.ranges.length > 1 && (h = Bp(r, a.pos)) ? h : o ? r.addRange(c) : Q.create([c]);
    }
  };
}
function Bp(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: r } = n.ranges[t];
    if (i <= e && r >= e)
      return Q.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
De.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let r = n.docView.tile.nearest(e.target);
    if (r && r.isWidget()) {
      let s = r.posAtStart, l = s + r.length;
      (s >= t.to || l <= t.from) && (t = Q.undirectionalRange(s, l));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Dr(n.state, Ul, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
De.dragend = (n) => (n.inputState.draggedContent = null, !1);
function Oa(n, e, t, i) {
  if (t = Dr(n.state, Nl, t), !t)
    return;
  let r = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: s } = n.inputState, l = i && s && jp(n, e) ? { from: s.from, to: s.to } : null, o = { from: r, insert: t }, a = n.state.changes(l ? [l, o] : o);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(r, -1), head: a.mapPos(r, 1) },
    userEvent: l ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
De.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), r = 0, s = () => {
      ++r == t.length && Oa(n, e, i.filter((l) => l != null).join(n.state.lineBreak), !1);
    };
    for (let l = 0; l < t.length; l++) {
      let o = new FileReader();
      o.onerror = s, o.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(o.result) || (i[l] = o.result), s();
      }, o.readAsText(t[l]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Oa(n, e, i, !0), !0;
  }
  return !1;
};
De.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = uf ? null : e.clipboardData;
  return t ? (Of(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (zp(n), !1);
};
function Vp(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function qp(n) {
  let e = [], t = [], i = !1;
  for (let r of n.selection.ranges)
    r.empty || (e.push(n.sliceDoc(r.from, r.to)), t.push(r));
  if (!e.length) {
    let r = -1;
    for (let { from: s } of n.selection.ranges) {
      let l = n.doc.lineAt(s);
      l.number > r && (e.push(l.text), t.push({ from: l.from, to: Math.min(n.doc.length, l.to + 1) })), r = l.number;
    }
    i = !0;
  }
  return { text: Dr(n, Ul, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let Ol = null;
De.copy = De.cut = (n, e) => {
  if (!Fi(n.contentDOM, n.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: r } = qp(n.state);
  if (!t && !r)
    return !1;
  Ol = r ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let s = uf ? null : e.clipboardData;
  return s ? (s.clearData(), s.setData("text/plain", t), !0) : (Vp(n, t), !1);
};
const pf = /* @__PURE__ */ Qt.define();
function gf(n, e) {
  let t = [];
  for (let i of n.facet(Nc)) {
    let r = i(n, e);
    r && t.push(r);
  }
  return t.length ? n.update({ effects: t, annotations: pf.of(!0) }) : null;
}
function mf(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = gf(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
be.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), mf(n);
};
be.blur = (n) => {
  n.observer.clearSelectionRange(), mf(n);
};
be.compositionstart = be.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
be.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, P.chrome && P.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
be.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
De.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let s = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), l = e.getTargetRanges();
    if (s && l.length) {
      let o = l[0], a = n.posAtDOM(o.startContainer, o.startOffset), h = n.posAtDOM(o.endContainer, o.endOffset);
      return Kl(n, { from: a, to: h, insert: n.state.toText(s) }, null), !0;
    }
  }
  let r;
  if (P.chrome && P.android && (r = cf.find((s) => s.inputType == e.inputType)) && (n.observer.delayAndroidKey(r.key, r.keyCode), r.key == "Backspace" || r.key == "Delete")) {
    let s = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var l;
      (((l = window.visualViewport) === null || l === void 0 ? void 0 : l.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return P.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), P.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => be.compositionend(n, e), 20), !1;
};
const da = /* @__PURE__ */ new Set();
function Dp(n) {
  da.has(n) || (da.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const pa = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let pi = !1;
function ga() {
  pi = !1;
}
class Ip {
  constructor(e) {
    this.lineWrapping = e, this.doc = j.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return pa.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      r < 0 ? i++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, r, s, l) {
    let o = pa.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != o;
    if (this.lineWrapping = o, this.lineHeight = t, this.charWidth = i, this.textHeight = r, this.lineLength = s, a) {
      this.heightSamples = {};
      for (let h = 0; h < l.length; h++) {
        let c = l[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class Gp {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class _e {
  /**
  @internal
  */
  constructor(e, t, i, r, s) {
    this.from = e, this.length = t, this.top = i, this.height = r, this._content = s;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? we.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof Vt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new _e(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var G = /* @__PURE__ */ (function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
})(G || (G = {}));
const ar = 1e-3;
class Se {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > ar && (pi = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return Se.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, r) {
    let s = this, l = i.doc;
    for (let o = r.length - 1; o >= 0; o--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = r[o], u = s.lineAt(a, G.ByPosNoHeight, i.setDoc(t), 0, 0), O = u.to >= h ? u : s.lineAt(h, G.ByPosNoHeight, i, 0, 0);
      for (f += O.to - h, h = O.to; o > 0 && u.from <= r[o - 1].toA; )
        a = r[o - 1].fromA, c = r[o - 1].fromB, o--, a < u.from && (u = s.lineAt(a, G.ByPosNoHeight, i, 0, 0));
      c += u.from - a, a = u.from;
      let d = Jl.build(i.setDoc(l), e, c, f);
      s = xr(s, s.replace(a, h, d));
    }
    return s.updateHeight(i, 0);
  }
  static empty() {
    return new Te(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, r = 0, s = 0;
    for (; ; )
      if (t == i)
        if (r > s * 2) {
          let o = e[t - 1];
          o.break ? e.splice(--t, 1, o.left, null, o.right) : e.splice(--t, 1, o.left, o.right), i += 1 + o.break, r -= o.size;
        } else if (s > r * 2) {
          let o = e[i];
          o.break ? e.splice(i, 1, o.left, null, o.right) : e.splice(i, 1, o.left, o.right), i += 2 + o.break, s -= o.size;
        } else
          break;
      else if (r < s) {
        let o = e[t++];
        o && (r += o.size);
      } else {
        let o = e[--i];
        o && (s += o.size);
      }
    let l = 0;
    return e[t - 1] == null ? (l = 1, t--) : e[t] == null && (l = 1, i++), new Up(Se.of(e.slice(0, t)), l, Se.of(e.slice(i)));
  }
}
function xr(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (pi = !0), e);
}
Se.prototype.size = 1;
const Np = /* @__PURE__ */ V.replace({});
class Sf extends Se {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new _e(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, r) {
    return this.spaceAbove && e < i + this.spaceAbove ? new _e(r, 0, i, this.spaceAbove, Np) : this.mainBlock(i, r);
  }
  lineAt(e, t, i, r, s) {
    let l = this.mainBlock(r, s);
    return this.spaceAbove ? this.blockAt(0, i, r, s).join(l) : l;
  }
  forEachLine(e, t, i, r, s, l) {
    e <= s + this.length && t >= s && l(this.lineAt(0, G.ByPos, i, r, s));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class Te extends Sf {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new _e(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let r = i[0];
    return i.length == 1 && (r instanceof Te || r instanceof ae && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof ae ? r = new Te(r.length, this.height, this.spaceAbove) : r.height = this.height, this.outdated || (r.outdated = !1), r) : Se.of(i);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class ae extends Se {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, s = r - i + 1, l, o = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * s);
      l = a / s, this.length > s + 1 && (o = (this.height - a) / (this.length - s - 1));
    } else
      l = this.height / s;
    return { firstLine: i, lastLine: r, perLine: l, perChar: o };
  }
  blockAt(e, t, i, r) {
    let { firstLine: s, lastLine: l, perLine: o, perChar: a } = this.heightMetrics(t, r);
    if (t.lineWrapping) {
      let h = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = o + c.length * a, u = Math.max(i, e - f / 2);
      return new _e(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(l - s, Math.floor((e - i) / o))), { from: c, length: f } = t.doc.line(s + h);
      return new _e(c, f, i + o * h, o, 0);
    }
  }
  lineAt(e, t, i, r, s) {
    if (t == G.ByHeight)
      return this.blockAt(e, i, r, s);
    if (t == G.ByPosNoHeight) {
      let { from: O, to: d } = i.doc.lineAt(e);
      return new _e(O, d - O, 0, 0, 0);
    }
    let { firstLine: l, perLine: o, perChar: a } = this.heightMetrics(i, s), h = i.doc.lineAt(e), c = o + h.length * a, f = h.number - l, u = r + o * f + a * (h.from - s - f);
    return new _e(h.from, h.length, Math.max(r, Math.min(u, r + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, r, s, l) {
    e = Math.max(e, s), t = Math.min(t, s + this.length);
    let { firstLine: o, perLine: a, perChar: h } = this.heightMetrics(i, s);
    for (let c = e, f = r; c <= t; ) {
      let u = i.doc.lineAt(c);
      if (c == e) {
        let d = u.number - o;
        f += a * d + h * (e - s - d);
      }
      let O = a + h * u.length;
      l(new _e(u.from, u.length, f, O, 0)), f += O, c = u.to + 1;
    }
  }
  replace(e, t, i) {
    let r = this.length - t;
    if (r > 0) {
      let s = i[i.length - 1];
      s instanceof ae ? i[i.length - 1] = new ae(s.length + r) : i.push(null, new ae(r - 1));
    }
    if (e > 0) {
      let s = i[0];
      s instanceof ae ? i[0] = new ae(e + s.length) : i.unshift(new ae(e - 1), null);
    }
    return Se.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new ae(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new ae(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, r) {
    let s = t + this.length;
    if (r && r.from <= t + this.length && r.more) {
      let l = [], o = Math.max(t, r.from), a = -1;
      for (r.from > t && l.push(new ae(r.from - t - 1).updateHeight(e, t)); o <= s && r.more; ) {
        let c = e.doc.lineAt(o).length;
        l.length && l.push(null);
        let f = r.heights[r.index++], u = 0;
        f < 0 && (u = -f, f = r.heights[r.index++]), a == -1 ? a = f : Math.abs(f - a) >= ar && (a = -2);
        let O = new Te(c, f, u);
        O.outdated = !1, l.push(O), o += c + 1;
      }
      o <= s && l.push(null, new ae(s - o).updateHeight(e, o));
      let h = Se.of(l);
      return (a < 0 || Math.abs(h.height - this.height) >= ar || Math.abs(a - this.heightMetrics(e, t).perLine) >= ar) && (pi = !0), xr(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Up extends Se {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, r) {
    let s = i + this.left.height;
    return e < s ? this.left.blockAt(e, t, i, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break);
  }
  lineAt(e, t, i, r, s) {
    let l = r + this.left.height, o = s + this.left.length + this.break, a = t == G.ByHeight ? e < l : e < o, h = a ? this.left.lineAt(e, t, i, r, s) : this.right.lineAt(e, t, i, l, o);
    if (this.break || (a ? h.to < o : h.from > o))
      return h;
    let c = t == G.ByPosNoHeight ? G.ByPosNoHeight : G.ByPos;
    return a ? h.join(this.right.lineAt(o, c, i, l, o)) : this.left.lineAt(o, c, i, r, s).join(h);
  }
  forEachLine(e, t, i, r, s, l) {
    let o = r + this.left.height, a = s + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, r, s, l), t >= a && this.right.forEachLine(e, t, i, o, a, l);
    else {
      let h = this.lineAt(a, G.ByPos, i, r, s);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, r, s, l), h.to >= e && h.from <= t && l(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, o, a, l);
    }
  }
  replace(e, t, i) {
    let r = this.left.length + this.break;
    if (t < r)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - r, t - r, i));
    let s = [];
    e > 0 && this.decomposeLeft(e, s);
    let l = s.length;
    for (let o of i)
      s.push(o);
    if (e > 0 && ma(s, l - 1), t < this.length) {
      let o = s.length;
      this.decomposeRight(t, s), ma(s, o);
    }
    return Se.of(s);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, r = i + this.break;
    if (e >= r)
      return this.right.decomposeRight(e - r, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? Se.of(this.break ? [e, null, t] : [e, t]) : (this.left = xr(this.left, e), this.right = xr(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, r) {
    let { left: s, right: l } = this, o = t + s.length + this.break, a = null;
    return r && r.from <= t + s.length && r.more ? a = s = s.updateHeight(e, t, i, r) : s.updateHeight(e, t, i), r && r.from <= o + l.length && r.more ? a = l = l.updateHeight(e, o, i, r) : l.updateHeight(e, o, i), a ? this.balanced(s, l) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function ma(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof ae && (i = n[e + 1]) instanceof ae && n.splice(e - 1, 3, new ae(t.length + 1 + i.length));
}
const Fp = 5;
class Jl {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), r = this.nodes[this.nodes.length - 1];
      r instanceof Te ? r.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Te(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let r = i.widget ? i.widget.estimatedHeight : 0, s = i.widget ? i.widget.lineBreaks : 0;
      r < 0 && (r = this.oracle.lineHeight);
      let l = t - e;
      i.block ? this.addBlock(new Sf(l, r, i)) : (l || s || r >= Fp) && this.addLineDeco(r, s, l);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Te(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new ae(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof Te)
      return e;
    let t = new Te(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let r = this.ensureLine();
    r.length += i, r.collapsed += i, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof Te) && !this.isCovered ? this.nodes.push(new Te(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let r of this.nodes)
      r instanceof Te && r.updateHeight(this.oracle, i), i += r ? r.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, r) {
    let s = new Jl(i, e);
    return E.spans(t, i, r, s, 0), s.finish(i);
  }
}
function Hp(n, e, t) {
  let i = new Kp();
  return E.compare(n, e, t, i, 0), i.changes;
}
class Kp {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, r) {
    (e < t || i && i.heightRelevant || r && r.heightRelevant) && si(e, t, this.changes, 5);
  }
}
function Jp(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, r = i.defaultView || window, s = Math.max(0, t.left), l = Math.min(r.innerWidth, t.right), o = Math.max(0, t.top), a = Math.min(r.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        s = Math.max(s, u.left), l = Math.min(l, u.right), o = Math.max(o, u.top), a = Math.min(h == n.parentNode ? r.innerHeight : a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: s - t.left,
    right: Math.max(s, l) - t.left,
    top: o - (t.top + e),
    bottom: Math.max(o, a) - (t.top + e)
  };
}
function eg(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function tg(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class fs {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.size = i, this.displaySize = r;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i], s = t[i];
      if (r.from != s.from || r.to != s.to || r.size != s.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return V.replace({
      widget: new ig(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class ig extends Rt {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class Sa {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Qa, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = te.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let i = t.facet(Fl).some((r) => typeof r != "function" && r.class == "cm-lineWrapping");
    this.heightOracle = new Ip(i), this.stateDeco = ba(t), this.heightMap = Se.empty().applyChanges(this.stateDeco, j.empty, this.heightOracle.setDoc(t.doc), [new Le(0, 0, 0, t.doc.length)]);
    for (let r = 0; r < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); r++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = V.set(this.lineGaps.map((r) => r.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let r = i ? t.head : t.anchor;
      if (!e.some(({ from: s, to: l }) => r >= s && r <= l)) {
        let { from: s, to: l } = this.lineBlockAt(r);
        e.push(new _n(s, l));
      }
    }
    return this.viewports = e.sort((i, r) => i.from - r.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Qa : new eo(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Bi(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = ba(this.state);
    let r = e.changedRanges, s = Le.extendWithRanges(r, Hp(i, this.stateDeco, e ? e.changes : ie.empty(this.state.doc.length))), l = this.heightMap.height, o = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    ga(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), s), (this.heightMap.height != l || pi) && (e.flags |= 2), o ? (this.scrollAnchorPos = e.changes.mapPos(o.from, -1), this.scrollAnchorHeight = o.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = l);
    let a = s.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Id) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), r = this.heightOracle, s = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? te.RTL : te.LTR;
    let l = this.heightOracle.mustRefreshForWrapping(s) || this.mustMeasureContent === "refresh", o = t.getBoundingClientRect(), a = l || this.mustMeasureContent || this.contentDOMHeight != o.height;
    this.contentDOMHeight = o.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (o.width && o.height) {
      let { scaleX: $, scaleY: v } = Cc(t, o);
      ($ > 5e-3 && Math.abs(this.scaleX - $) > 5e-3 || v > 5e-3 && Math.abs(this.scaleY - v) > 5e-3) && (this.scaleX = $, this.scaleY = v, h |= 16, l = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let O = Ac(this.view.contentDOM, !1).y;
    O != this.scrollParent && (this.scrollParent = O, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let d = this.getScrollOffset();
    this.scrollOffset != d && (this.scrollAnchorHeight = -1, this.scrollOffset = d), this.scrolledToBottom = Lc(this.scrollParent || e.win);
    let p = (this.printing ? tg : Jp)(t, this.paddingTop), g = p.top - this.pixelViewport.top, S = p.bottom - this.pixelViewport.bottom;
    this.pixelViewport = p;
    let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (y != this.inView && (this.inView = y, y && (a = !0)), !this.inView && !this.scrollTarget && !eg(e.dom))
      return 0;
    let b = o.width;
    if ((this.contentDOMWidth != b || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = o.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let $ = e.docView.measureVisibleLineHeights(this.viewport);
      if (r.mustRefreshForHeights($) && (l = !0), l || r.lineWrapping && Math.abs(b - this.contentDOMWidth) > r.charWidth) {
        let { lineHeight: v, charWidth: x, textHeight: L } = e.docView.measureTextSize();
        l = v > 0 && r.refresh(s, v, x, L, Math.max(5, b / x), $), l && (e.docView.minWidth = 0, h |= 16);
      }
      g > 0 && S > 0 ? c = Math.max(g, S) : g < 0 && S < 0 && (c = Math.min(g, S)), ga();
      for (let v of this.viewports) {
        let x = v.from == this.viewport.from ? $ : e.docView.measureVisibleLineHeights(v);
        this.heightMap = (l ? Se.empty().applyChanges(this.stateDeco, j.empty, this.heightOracle, [new Le(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, l, new Gp(v.from, x));
      }
      pi && (h |= 2);
    }
    let A = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return A && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || A) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(l ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), r = this.heightMap, s = this.heightOracle, { visibleTop: l, visibleBottom: o } = this, a = new _n(r.lineAt(l - i * 1e3, G.ByHeight, s, 0, 0).from, r.lineAt(o + (1 - i) * 1e3, G.ByHeight, s, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = r.lineAt(h, G.ByPos, s, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new _n(r.lineAt(u - 1e3 / 2, G.ByHeight, s, 0, 0).from, r.lineAt(u + c + 1e3 / 2, G.ByHeight, s, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
    return new _n(this.heightMap.lineAt(i, G.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, G.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: r } = this.heightMap.lineAt(e, G.ByPos, this.heightOracle, 0, 0), { bottom: s } = this.heightMap.lineAt(t, G.ByPos, this.heightOracle, 0, 0), { visibleTop: l, visibleBottom: o } = this;
    return (e == 0 || r <= l - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || s >= o + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && r > l - 2 * 1e3 && s < o + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let r of e)
      t.touchesRange(r.from, r.to) || i.push(new fs(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, r = i ? 1e4 : 2e3, s = r >> 1, l = r << 1;
    if (this.defaultTextDirection != te.LTR && !i)
      return [];
    let o = [], a = (c, f, u, O) => {
      if (f - c < s)
        return;
      let d = this.state.selection.main, p = [d.from];
      d.empty || p.push(d.to);
      for (let S of p)
        if (S > c && S < f) {
          a(c, S - 10, u, O), a(S + 10, f, u, O);
          return;
        }
      let g = rg(e, (S) => S.from >= u.from && S.to <= u.to && Math.abs(S.from - c) < s && Math.abs(S.to - f) < s && !p.some((y) => S.from < y && S.to > y));
      if (!g) {
        if (f < u.to && t && i && t.visibleRanges.some((b) => b.from <= f && b.to >= f)) {
          let b = t.moveToLineBoundary(Q.cursor(f), !1, !0).head;
          b > c && (f = b);
        }
        let S = this.gapSize(u, c, f, O), y = i || S < 2e6 ? S : 2e6;
        g = new fs(c, f, S, y);
      }
      o.push(g);
    }, h = (c) => {
      if (c.length < l || c.type != we.Text)
        return;
      let f = ng(c.from, c.to, this.stateDeco);
      if (f.total < l)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, O, d;
      if (i) {
        let p = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, S;
        if (u != null) {
          let y = Bn(f, u), b = ((this.visibleBottom - this.visibleTop) / 2 + p) / c.height;
          g = y - b, S = y + b;
        } else
          g = (this.visibleTop - c.top - p) / c.height, S = (this.visibleBottom - c.top + p) / c.height;
        O = Wn(f, g), d = Wn(f, S);
      } else {
        let p = f.total * this.heightOracle.charWidth, g = r * this.heightOracle.charWidth, S = 0;
        if (p > 2e6)
          for (let v of e)
            v.from >= c.from && v.from < c.to && v.size != v.displaySize && v.from * this.heightOracle.charWidth + S < this.pixelViewport.left && (S = v.size - v.displaySize);
        let y = this.pixelViewport.left + S, b = this.pixelViewport.right + S, A, $;
        if (u != null) {
          let v = Bn(f, u), x = ((b - y) / 2 + g) / p;
          A = v - x, $ = v + x;
        } else
          A = (y - g) / p, $ = (b + g) / p;
        O = Wn(f, A), d = Wn(f, $);
      }
      O > c.from && a(c.from, O, c, f), d < c.to && a(d, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return o;
  }
  gapSize(e, t, i, r) {
    let s = Bn(r, i) - Bn(r, t);
    return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s;
  }
  updateLineGaps(e) {
    fs.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = V.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    E.spans(t, this.viewport.from, this.viewport.to, {
      span(s, l) {
        i.push({ from: s, to: l });
      },
      point() {
      }
    }, 20);
    let r = 0;
    if (i.length != this.visibleRanges.length)
      r = 12;
    else
      for (let s = 0; s < i.length && !(r & 8); s++) {
        let l = this.visibleRanges[s], o = i[s];
        (l.from != o.from || l.to != o.to) && (r |= 4, e && e.mapPos(l.from, -1) == o.from && e.mapPos(l.to, 1) == o.to || (r |= 8));
      }
    return this.visibleRanges = i, r;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Bi(this.heightMap.lineAt(e, G.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Bi(this.heightMap.lineAt(this.scaler.fromDOM(e), G.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Bi(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class _n {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function ng(n, e, t) {
  let i = [], r = n, s = 0;
  return E.spans(t, n, e, {
    span() {
    },
    point(l, o) {
      l > r && (i.push({ from: r, to: l }), s += l - r), r = o;
    }
  }, 20), r < e && (i.push({ from: r, to: e }), s += e - r), { total: s, ranges: i };
}
function Wn({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let r = 0; ; r++) {
    let { from: s, to: l } = e[r], o = l - s;
    if (i <= o)
      return s + i;
    i -= o;
  }
}
function Bn(n, e) {
  let t = 0;
  for (let { from: i, to: r } of n.ranges) {
    if (e <= r) {
      t += e - i;
      break;
    }
    t += r - i;
  }
  return t / n.total;
}
function rg(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const Qa = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function ba(n) {
  let e = n.facet(Br).filter((i) => typeof i != "function"), t = n.facet(Hl).filter((i) => typeof i != "function");
  return t.length && e.push(E.join(t)), e;
}
class eo {
  constructor(e, t, i) {
    let r = 0, s = 0, l = 0;
    this.viewports = i.map(({ from: o, to: a }) => {
      let h = t.lineAt(o, G.ByPos, e, 0, 0).top, c = t.lineAt(a, G.ByPos, e, 0, 0).bottom;
      return r += c - h, { from: o, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - r) / (t.height - r);
    for (let o of this.viewports)
      o.domTop = l + (o.top - s) * this.scale, l = o.domBottom = o.domTop + (o.bottom - o.top), s = o.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.top)
        return r + (e - i) * this.scale;
      if (e <= s.bottom)
        return s.domTop + (e - s.top);
      i = s.bottom, r = s.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.domTop)
        return i + (e - r) / this.scale;
      if (e <= s.domBottom)
        return s.top + (e - s.domTop);
      i = s.bottom, r = s.domBottom;
    }
  }
  eq(e) {
    return e instanceof eo ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function Bi(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new _e(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((r) => Bi(r, e)) : n._content);
}
const Vn = /* @__PURE__ */ T.define({ combine: (n) => n.join(" ") }), dl = /* @__PURE__ */ T.define({ combine: (n) => n.indexOf(!0) > -1 }), pl = /* @__PURE__ */ ui.newName(), Qf = /* @__PURE__ */ ui.newName(), bf = /* @__PURE__ */ ui.newName(), yf = { "&light": "." + Qf, "&dark": "." + bf };
function gl(n, e, t) {
  return new ui(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (r) => {
        if (r == "&")
          return n;
        if (!t || !t[r])
          throw new RangeError(`Unsupported selector: ${r}`);
        return t[r];
      }) : n + " " + i;
    }
  });
}
const sg = /* @__PURE__ */ gl("." + pl, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // Issue #456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    userSelect: "none",
    // #1708
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-selectionHandle": {
    backgroundColor: "currentColor",
    width: "1.5px"
  },
  ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
    content: '""',
    backgroundColor: "inherit",
    borderRadius: "50%",
    width: "8px",
    height: "8px",
    position: "absolute",
    left: "-3.25px"
  },
  ".cm-selectionHandle-start::before": { top: "-8px" },
  ".cm-selectionHandle-end::before": { bottom: "-8px" },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  ".cm-panels-top": { top: "0" },
  ".cm-panels-bottom": { bottom: "0" },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, yf), lg = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, us = P.ie && P.ie_version <= 11;
class og {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Md(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (P.ie && P.ie_version <= 11 || P.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && P.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(P.chrome && P.chrome_version < 126) && (this.editContext = new hg(e), e.state.facet(ft) && (e.contentDOM.editContext = this.editContext.editContext)), us && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, r = this.selectionRange;
    if (i.state.facet(ft) ? i.root.activeElement != this.dom : !Fi(this.dom, r))
      return;
    let s = r.anchorNode && i.docView.tile.nearest(r.anchorNode);
    if (s && s.isWidget() && s.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (P.ie && P.ie_version <= 11 || P.android && P.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    r.focusNode && Hi(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = on(e.root);
    if (!t)
      return !1;
    let i = P.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && ag(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let r = Fi(this.dom, i);
    return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && jd(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), r && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, lg), us && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), us && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let r = () => {
        let s = this.delayedAndroidKey;
        s && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = s.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && s.force && li(this.dom, s.key, s.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(r);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, r = !1;
    for (let s of e) {
      let l = this.readMutation(s);
      l && (l.typeOver && (r = !0), t == -1 ? { from: t, to: i } = l : (t = Math.min(l.from, t), i = Math.max(l.to, i)));
    }
    return { from: t, to: i, typeOver: r };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), r = this.selectionChanged && Fi(this.dom, this.selectionRange);
    if (e < 0 && !r)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let s = new $p(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: s.newSel ? s.newSel.main : null }, s;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, r = af(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !kr(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = ya(t, e.previousSibling || e.target.previousSibling, -1), r = ya(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: r ? t.posBefore(r) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(ft) != e.state.facet(ft) && (e.view.contentDOM.editContext = e.state.facet(ft) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let r of this.scrollTargets)
      r.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function ya(n, e, t) {
  for (; e; ) {
    let i = K.get(e);
    if (i && i.parent == n)
      return i;
    let r = e.parentNode;
    e = r != n.dom ? r : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function ka(n, e) {
  let t = e.startContainer, i = e.startOffset, r = e.endContainer, s = e.endOffset, l = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return Hi(l.node, l.offset, r, s) && ([t, i, r, s] = [r, s, t, i]), { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s };
}
function ag(n, e) {
  if (e.getComposedRanges) {
    let r = e.getComposedRanges(n.root)[0];
    if (r)
      return ka(n, r);
  }
  let t = null;
  function i(r) {
    r.preventDefault(), r.stopImmediatePropagation(), t = r.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? ka(n, t) : null;
}
class hg {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let r = e.state.selection.main, { anchor: s, head: l } = r, o = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: o, drifted: !1 });
      let h = a - o > i.text.length;
      o == this.from && s < this.from ? o = s : a == this.to && s > this.to && (a = s);
      let c = hf(e.state.sliceDoc(o, a), i.text, (h ? r.from : r.to) - o, h ? "end" : null);
      if (!c) {
        let u = Q.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        kr(u, r) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + o,
        to: c.toA + o,
        insert: j.of(i.text.slice(c.from, c.toB).split(`
`))
      };
      if ((P.mac || P.android) && f.from == l - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: o, to: a, insert: j.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let u = this.to - this.from + (f.to - f.from + f.insert.length);
        Kl(e, f, Q.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let r = [], s = null;
      for (let l = this.toEditorPos(i.rangeStart), o = this.toEditorPos(i.rangeEnd); l < o; l++) {
        let a = e.coordsForChar(l);
        s = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || s || new DOMRect(), r.push(s);
      }
      t.updateCharacterBounds(i.rangeStart, r);
    }, this.handlers.textformatupdate = (i) => {
      let r = [];
      for (let s of i.getTextFormats()) {
        let l = s.underlineStyle, o = s.underlineThickness;
        if (!/none/i.test(l) && !/none/i.test(o)) {
          let a = this.toEditorPos(s.rangeStart), h = this.toEditorPos(s.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(l) ? l + " " : l == "Dashed" ? "dashed " : l == "Squiggle" ? "wavy " : ""}${/thin/i.test(o) ? 1 : 2}px`;
            r.push(V.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: Hc.of(V.set(r)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      let r = on(i.root);
      r && r.rangeCount && this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, r = this.pendingContextChange;
    return e.changes.iterChanges((s, l, o, a, h) => {
      if (i)
        return;
      let c = h.length - (l - s);
      if (r && l >= r.to)
        if (r.from == s && r.to == l && r.insert.eq(h)) {
          r = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else
          r = null, this.revertPending(e.state);
      if (s += t, l += t, l <= this.from)
        this.from += c, this.to += c;
      else if (s < this.to) {
        if (s < this.from || l > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(s), this.toContextPos(l), h.toString()), this.to += c;
      }
      t += c;
    }), r && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((r) => !r.isUserEvent("input.type") && r.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != r) && this.editContext.updateSelection(i, r);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class C {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((r) => r.forEach((s) => i(s, this))) || ((r) => this.update(r)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Ld(e.parent) || document, this.viewState = new Sa(this, e.state || z.create(e)), e.scrollTo && e.scrollTo.is(En) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(ei).map((r) => new ls(r));
    for (let r of this.plugins)
      r.update(this);
    this.observer = new og(this), this.inputState = new Zp(this), this.inputState.ensureHandlers(this.plugins), this.docView = new sa(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof ee ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, r, s = this.state;
    for (let u of e) {
      if (u.startState != s)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      s = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = s;
      return;
    }
    let l = this.hasFocus, o = 0, a = null;
    e.some((u) => u.annotation(pf)) ? (this.inputState.notifiedFocused = l, o = 1) : l != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = l, a = gf(s, l), a || (o = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (c = null)) : this.observer.clear(), s.facet(z.phrases) != this.state.facet(z.phrases))
      return this.setState(s);
    r = Qr.create(this, s, e), r.flags |= o;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: O } = u.state.selection, { x: d, y: p } = this.state.facet(C.cursorScrollMargin);
          f = new oi(O.empty ? O : Q.cursor(O.head, O.head > O.anchor ? -1 : 1), "nearest", "nearest", p, d);
        }
        for (let O of u.effects)
          O.is(En) && (f = O.value.clip(this.state));
      }
      this.viewState.update(r, f), this.bidiCache = wr.update(this.bidiCache, r.changes), r.empty || (this.updatePlugins(r), this.inputState.update(r)), t = this.docView.update(r), this.state.facet(Wi) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (r.startState.facet(Vn) != r.state.facet(Vn) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !r.empty)
      for (let u of this.state.facet(cl))
        try {
          u(r);
        } catch (O) {
          it(this.state, O, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !af(this, c) && h.force && li(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new Sa(this, e), this.plugins = e.facet(ei).map((i) => new ls(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new sa(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(ei), i = e.state.facet(ei);
    if (t != i) {
      let r = [];
      for (let s of i) {
        let l = t.indexOf(s);
        if (l < 0)
          r.push(new ls(s));
        else {
          let o = this.plugins[l];
          o.mustUpdate = e, r.push(o);
        }
      }
      for (let s of this.plugins)
        s.mustUpdate != e && s.destroy(this);
      this.plugins = r, this.pluginMap.clear();
    } else
      for (let r of this.plugins)
        r.mustUpdate = e;
    for (let r = 0; r < this.plugins.length; r++)
      this.plugins[r].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          it(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.viewState.scrollParent, r = this.viewState.getScrollOffset(), { scrollAnchorPos: s, scrollAnchorHeight: l } = this.viewState;
    Math.abs(r - this.viewState.scrollOffset) > 1 && (l = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let o = 0; ; o++) {
        if (l < 0)
          if (Lc(i || this.win))
            s = -1, l = this.viewState.heightMap.height;
          else {
            let O = this.viewState.scrollAnchorAt(r);
            s = O.from, l = O.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure();
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (o > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((O) => {
          try {
            return O.read(this);
          } catch (d) {
            return it(this.state, d), xa;
          }
        }), f = Qr.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let O = 0; O < h.length; O++)
          if (c[O] != xa)
            try {
              let d = h[O];
              d.write && d.write(c[O], this);
            } catch (d) {
              it(this.state, d);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, l = -1;
              continue;
            } else {
              let d = ((s < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(s).top) - l) / this.scaleY;
              if ((d > 1 || d < -1) && !(P.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                r = r + d, i ? i.scrollTop += d : this.win.scrollBy(0, d), l = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let o of this.state.facet(cl))
        o(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return pl + " " + (this.state.facet(dl) ? bf : Qf) + " " + this.state.facet(Vn);
  }
  updateAttrs() {
    let e = wa(this, Kc, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(ft) ? "true" : "false",
      class: "cm-content",
      style: `${P.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), wa(this, Fl, t);
    let i = this.observer.ignore(() => {
      let r = Jo(this.contentDOM, this.contentAttrs, t), s = Jo(this.dom, this.editorAttrs, e);
      return r || s;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let r of i.effects)
        if (r.is(C.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let s = this.announceDOM.appendChild(document.createElement("div"));
          s.textContent = r.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Wi);
    let e = this.state.facet(C.cspNonce);
    ui.mount(this.root, this.styleModules.concat(sg).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return cs(this, e, la(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return cs(this, e, la(this, e, t, (i) => Qp(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), r = this.textDirectionAt(e.from), s = i[t ? i.length - 1 : 0];
    return Q.cursor(s.side(t, r) + e.from, s.forward(!t, r) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return Sp(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return cs(this, e, bp(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = ul(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), ul(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.state.doc.lineAt(e), r = this.bidiSpans(i), s = r[tt.find(r, e - i.from, -1, t)];
    return this.docView.coordsAt(e, t, s.dir == te.RTL);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(Uc) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > cg)
      return Wc(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let s of this.bidiCache)
      if (s.from == e.from && s.dir == t && (s.fresh || _c(s.isolates, i = ia(this, e))))
        return s.order;
    i || (i = ia(this, e));
    let r = Vd(e.text, t, i);
    return this.bidiCache.push(new wr(e.from, e.to, t, i, !0, r)), r;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || P.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Mc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    var i, r, s, l;
    return En.of(new oi(typeof e == "number" ? Q.cursor(e) : e, (i = t.y) !== null && i !== void 0 ? i : "nearest", (r = t.x) !== null && r !== void 0 ? r : "nearest", (s = t.yMargin) !== null && s !== void 0 ? s : 5, (l = t.xMargin) !== null && l !== void 0 ? l : 5));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return En.of(new oi(Q.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return At.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return At.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = ui.newName(), r = [Vn.of(i), Wi.of(gl(`.${i}`, e))];
    return t && t.dark && r.push(dl.of(!0)), r;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return $i.lowest(Wi.of(gl("." + pl, e, yf)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), r = i && K.get(i) || K.get(e);
    return ((t = r == null ? void 0 : r.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
C.styleModule = Wi;
C.inputHandler = Gc;
C.clipboardInputFilter = Nl;
C.clipboardOutputFilter = Ul;
C.scrollHandler = Fc;
C.focusChangeEffect = Nc;
C.perLineTextDirection = Uc;
C.exceptionSink = Ic;
C.updateListener = cl;
C.editable = ft;
C.mouseSelectionStyle = Dc;
C.dragMovesSelection = qc;
C.clickAddsSelectionRange = Vc;
C.decorations = Br;
C.blockWrappers = Jc;
C.outerDecorations = Hl;
C.atomicRanges = xn;
C.bidiIsolatedRanges = ef;
C.cursorScrollMargin = /* @__PURE__ */ T.define({
  combine: (n) => {
    let e = 5, t = 5;
    for (let i of n)
      typeof i == "number" ? e = t = i : { x: e, y: t } = i;
    return { x: e, y: t };
  }
});
C.scrollMargins = tf;
C.darkTheme = dl;
C.cspNonce = /* @__PURE__ */ T.define({ combine: (n) => n.length ? n[0] : "" });
C.contentAttributes = Fl;
C.editorAttributes = Kc;
C.lineWrapping = /* @__PURE__ */ C.contentAttributes.of({ class: "cm-lineWrapping" });
C.announce = /* @__PURE__ */ I.define();
const cg = 4096, xa = {};
class wr {
  constructor(e, t, i, r, s, l) {
    this.from = e, this.to = t, this.dir = i, this.isolates = r, this.fresh = s, this.order = l;
  }
  static update(e, t) {
    if (t.empty && !e.some((s) => s.fresh))
      return e;
    let i = [], r = e.length ? e[e.length - 1].dir : te.LTR;
    for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
      let l = e[s];
      l.dir == r && !t.touchesRange(l.from, l.to) && i.push(new wr(t.mapPos(l.from, 1), t.mapPos(l.to, -1), l.dir, l.isolates, !1, l.order));
    }
    return i;
  }
}
function wa(n, e, t) {
  for (let i = n.state.facet(e), r = i.length - 1; r >= 0; r--) {
    let s = i[r], l = typeof s == "function" ? s(n) : s;
    l && Dl(l, t);
  }
  return t;
}
const fg = P.mac ? "mac" : P.windows ? "win" : P.linux ? "linux" : "key";
function ug(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let r, s, l, o;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      o = !0;
    else if (/^a(lt)?$/i.test(h))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      s = !0;
    else if (/^s(hift)?$/i.test(h))
      l = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? o = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return r && (i = "Alt-" + i), s && (i = "Ctrl-" + i), o && (i = "Meta-" + i), l && (i = "Shift-" + i), i;
}
function qn(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const Og = /* @__PURE__ */ $i.default(/* @__PURE__ */ C.domEventHandlers({
  keydown(n, e) {
    return mg(dg(e.state), n, e, "editor");
  }
})), Ir = /* @__PURE__ */ T.define({ enables: Og }), $a = /* @__PURE__ */ new WeakMap();
function dg(n) {
  let e = n.facet(Ir), t = $a.get(e);
  return t || $a.set(e, t = gg(e.reduce((i, r) => i.concat(r), []))), t;
}
let $t = null;
const pg = 4e3;
function gg(n, e = fg) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), r = (l, o) => {
    let a = i[l];
    if (a == null)
      i[l] = o;
    else if (a != o)
      throw new Error("Key binding " + l + " is used both as a regular binding and as a multi-stroke prefix");
  }, s = (l, o, a, h, c) => {
    var f, u;
    let O = t[l] || (t[l] = /* @__PURE__ */ Object.create(null)), d = o.split(/ (?!$)/).map((S) => ug(S, e));
    for (let S = 1; S < d.length; S++) {
      let y = d.slice(0, S).join(" ");
      r(y, !0), O[y] || (O[y] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(b) => {
          let A = $t = { view: b, prefix: y, scope: l };
          return setTimeout(() => {
            $t == A && ($t = null);
          }, pg), !0;
        }]
      });
    }
    let p = d.join(" ");
    r(p, !1);
    let g = O[p] || (O[p] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = O._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), h && (g.preventDefault = !0), c && (g.stopPropagation = !0);
  };
  for (let l of n) {
    let o = l.scope ? l.scope.split(" ") : ["editor"];
    if (l.any)
      for (let h of o) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = l;
        for (let u in c)
          c[u].run.push((O) => f(O, ml));
      }
    let a = l[e] || l.key;
    if (a)
      for (let h of o)
        s(h, a, l.run, l.preventDefault, l.stopPropagation), l.shift && s(h, "Shift-" + a, l.shift, l.preventDefault, l.stopPropagation);
  }
  return t;
}
let ml = null;
function mg(n, e, t, i) {
  ml = e;
  let r = Td(e), s = hd(r, 0), l = cd(s) == r.length && r != " ", o = "", a = !1, h = !1, c = !1;
  $t && $t.view == t && $t.scope == i && (o = $t.prefix + " ", ff.indexOf(e.keyCode) < 0 && (h = !0, $t = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let S of g.run)
        if (!f.has(S) && (f.add(S), S(t)))
          return g.stopPropagation && (c = !0), !0;
      g.preventDefault && (g.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, O = n[i], d, p;
  return O && (u(O[o + qn(r, e, !l)]) ? a = !0 : l && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(P.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(P.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (d = Zt[e.keyCode]) && d != r ? (u(O[o + qn(d, e, !0)]) || e.shiftKey && (p = sn[e.keyCode]) != r && p != d && u(O[o + qn(p, e, !1)])) && (a = !0) : l && e.shiftKey && u(O[o + qn(r, e, !0)]) && (a = !0), !a && u(O._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), ml = null, a;
}
class ot extends vt {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
ot.prototype.elementClass = "";
ot.prototype.toDOM = void 0;
ot.prototype.mapMode = me.TrackBefore;
ot.prototype.startSide = ot.prototype.endSide = -1;
ot.prototype.point = !0;
const Os = /* @__PURE__ */ T.define(), Sg = /* @__PURE__ */ T.define(), Qg = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => E.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {},
  side: "before"
}, Ji = /* @__PURE__ */ T.define();
function bg(n) {
  return [kf(), Ji.of({ ...Qg, ...n })];
}
const Pa = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
});
function kf(n) {
  return [
    yg
  ];
}
const yg = /* @__PURE__ */ At.fromClass(class {
  constructor(n) {
    this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Ji).map((e) => new Ta(n, e)), this.fixed = !n.state.facet(Pa);
    for (let e of this.gutters)
      e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(n) {
    if (this.updateGutters(n)) {
      let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    if (n.geometryChanged) {
      let e = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
    }
    this.view.state.facet(Pa) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let e = this.dom.nextSibling;
    n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let t = E.iter(this.view.state.facet(Os), this.view.viewport.from), i = [], r = this.gutters.map((s) => new kg(s, this.view.viewport, -this.view.documentPadding.top));
    for (let s of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(s.type)) {
        let l = !0;
        for (let o of s.type)
          if (o.type == we.Text && l) {
            Sl(t, i, o.from);
            for (let a of r)
              a.line(this.view, o, i);
            l = !1;
          } else if (o.widget)
            for (let a of r)
              a.widget(this.view, o);
      } else if (s.type == we.Text) {
        Sl(t, i, s.from);
        for (let l of r)
          l.line(this.view, s, i);
      } else if (s.widget)
        for (let l of r)
          l.widget(this.view, s);
    for (let s of r)
      s.finish();
    n && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(n) {
    let e = n.startState.facet(Ji), t = n.state.facet(Ji), i = n.docChanged || n.heightChanged || n.viewportChanged || !E.eq(n.startState.facet(Os), n.state.facet(Os), n.view.viewport.from, n.view.viewport.to);
    if (e == t)
      for (let r of this.gutters)
        r.update(n) && (i = !0);
    else {
      i = !0;
      let r = [];
      for (let s of t) {
        let l = e.indexOf(s);
        l < 0 ? r.push(new Ta(this.view, s)) : (this.gutters[l].update(n), r.push(this.gutters[l]));
      }
      for (let s of this.gutters)
        s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
      for (let s of r)
        s.config.side == "after" ? this.getDOMAfter().appendChild(s.dom) : this.dom.appendChild(s.dom);
      this.gutters = r;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (n) => C.scrollMargins.of((e) => {
    let t = e.plugin(n);
    if (!t || t.gutters.length == 0 || !t.fixed)
      return null;
    let i = t.dom.offsetWidth * e.scaleX, r = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
    return e.textDirection == te.LTR ? { left: i, right: r } : { right: i, left: r };
  })
});
function va(n) {
  return Array.isArray(n) ? n : [n];
}
function Sl(n, e, t) {
  for (; n.value && n.from <= t; )
    n.from == t && e.push(n.value), n.next();
}
class kg {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = E.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: r } = this, s = (t.top - this.height) / e.scaleY, l = t.height / e.scaleY;
    if (this.i == r.elements.length) {
      let o = new xf(e, l, s, i);
      r.elements.push(o), r.dom.appendChild(o.dom);
    } else
      r.elements[this.i].update(e, l, s, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let r = [];
    Sl(this.cursor, r, t.from), i.length && (r = r.concat(i));
    let s = this.gutter.config.lineMarker(e, t, r);
    s && r.unshift(s);
    let l = this.gutter;
    r.length == 0 && !l.config.renderEmptyElements || this.addElement(e, t, r);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t), r = i ? [i] : null;
    for (let s of e.state.facet(Sg)) {
      let l = s(e, t.widget, t);
      l && (r || (r = [])).push(l);
    }
    r && this.addElement(e, t, r);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class Ta {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (r) => {
        let s = r.target, l;
        if (s != this.dom && this.dom.contains(s)) {
          for (; s.parentNode != this.dom; )
            s = s.parentNode;
          let a = s.getBoundingClientRect();
          l = (a.top + a.bottom) / 2;
        } else
          l = r.clientY;
        let o = e.lineBlockAtHeight(l - e.documentTop);
        t.domEventHandlers[i](e, o, r) && r.preventDefault();
      });
    this.markers = va(t.markers(e)), t.initialSpacer && (this.spacer = new xf(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = va(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let r = this.config.updateSpacer(this.spacer.markers[0], e);
      r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r]);
    }
    let i = e.view.viewport;
    return !E.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class xf {
  constructor(e, t, i, r) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, r);
  }
  update(e, t, i, r) {
    this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), xg(this.markers, r) || this.setMarkers(e, r);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", r = this.dom.firstChild;
    for (let s = 0, l = 0; ; ) {
      let o = l, a = s < t.length ? t[s++] : null, h = !1;
      if (a) {
        let c = a.elementClass;
        c && (i += " " + c);
        for (let f = l; f < this.markers.length; f++)
          if (this.markers[f].compare(a)) {
            o = f, h = !0;
            break;
          }
      } else
        o = this.markers.length;
      for (; l < o; ) {
        let c = this.markers[l++];
        if (c.toDOM) {
          c.destroy(r);
          let f = r.nextSibling;
          r.remove(), r = f;
        }
      }
      if (!a)
        break;
      a.toDOM && (h ? r = r.nextSibling : this.dom.insertBefore(a.toDOM(e), r)), h && l++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function xg(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].compare(e[t]))
      return !1;
  return !0;
}
const wg = /* @__PURE__ */ T.define(), $g = /* @__PURE__ */ T.define(), ti = /* @__PURE__ */ T.define({
  combine(n) {
    return wc(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let r in t) {
          let s = i[r], l = t[r];
          i[r] = s ? (o, a, h) => s(o, a, h) || l(o, a, h) : l;
        }
        return i;
      }
    });
  }
});
class ds extends ot {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function ps(n, e) {
  return n.state.facet(ti).formatNumber(e, n.state);
}
const Pg = /* @__PURE__ */ Ji.compute([ti], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(wg);
  },
  lineMarker(e, t, i) {
    return i.some((r) => r.toDOM) ? null : new ds(ps(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: (e, t, i) => {
    for (let r of e.state.facet($g)) {
      let s = r(e, t, i);
      if (s)
        return s;
    }
    return null;
  },
  lineMarkerChange: (e) => e.startState.facet(ti) != e.state.facet(ti),
  initialSpacer(e) {
    return new ds(ps(e, Za(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = ps(t.view, Za(t.view.state.doc.lines));
    return i == e.number ? e : new ds(i);
  },
  domEventHandlers: n.facet(ti).domEventHandlers,
  side: "before"
}));
function vg(n = {}) {
  return [
    ti.of(n),
    kf(),
    Pg
  ];
}
function Za(n) {
  let e = 9;
  for (; e < n; )
    e = e * 10 + 9;
  return e;
}
const wf = 1024;
let Tg = 0;
class je {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class R {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Tg++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = le.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
R.closedBy = new R({ deserialize: (n) => n.split(" ") });
R.openedBy = new R({ deserialize: (n) => n.split(" ") });
R.group = new R({ deserialize: (n) => n.split(" ") });
R.isolate = new R({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
R.contextHash = new R({ perNode: !0 });
R.lookAhead = new R({ perNode: !0 });
R.mounted = new R({ perNode: !0 });
class ai {
  constructor(e, t, i, r = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = r;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[R.mounted.id];
  }
}
const Zg = /* @__PURE__ */ Object.create(null);
class le {
  /**
  @internal
  */
  constructor(e, t, i, r = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = r;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Zg, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), r = new le(e.name || "", t, e.id, i);
    if (e.props) {
      for (let s of e.props)
        if (Array.isArray(s) || (s = s(r)), s) {
          if (s[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[s[0].id] = s[1];
        }
    }
    return r;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(R.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let r of i.split(" "))
        t[r] = e[i];
    return (i) => {
      for (let r = i.prop(R.group), s = -1; s < (r ? r.length : 0); s++) {
        let l = t[s < 0 ? i.name : r[s]];
        if (l)
          return l;
      }
    };
  }
}
le.none = new le(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class wn {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let r = null;
      for (let s of e) {
        let l = s(i);
        if (l) {
          r || (r = Object.assign({}, i.props));
          let o = l[1], a = l[0];
          a.combine && a.id in r && (o = a.combine(r[a.id], o)), r[a.id] = o;
        }
      }
      t.push(r ? new le(i.name, r, i.id, i.flags) : i);
    }
    return new wn(t);
  }
}
const Dn = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakMap();
var W;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(W || (W = {}));
class _ {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, r, s) {
    if (this.type = e, this.children = t, this.positions = i, this.length = r, this.props = null, s && s.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [l, o] of s)
        this.props[typeof l == "number" ? l : l.id] = o;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = ai.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let r = i.toString();
      r && (t && (t += ","), t += r);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new $r(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let r = Dn.get(this) || this.topNode, s = new $r(r);
    return s.moveTo(e, t), Dn.set(this, s._tree), s;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new de(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = hn(Dn.get(this) || this.topNode, e, t, !1);
    return Dn.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = hn(Ca.get(this) || this.topNode, e, t, !0);
    return Ca.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return Xg(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: r = 0, to: s = this.length } = e, l = e.mode || 0, o = (l & W.IncludeAnonymous) > 0;
    for (let a = this.cursor(l | W.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= s && a.to >= r && (!o && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (o || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : no(le.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, r) => new _(this.type, t, i, r, this.propValues), e.makeTree || ((t, i, r) => new _(le.none, t, i, r)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return Rg(e);
  }
}
_.empty = new _(le.none, [], [], 0);
class to {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new to(this.buffer, this.index);
  }
}
class Xt {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return le.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], r = this.set.types[t], s = r.name;
    if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, i == e)
      return s;
    let l = [];
    for (; e < i; )
      l.push(this.childString(e)), e = this.buffer[e + 3];
    return s + "(" + l.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, r, s) {
    let { buffer: l } = this, o = -1;
    for (let a = e; a != t && !($f(s, r, l[a + 1], l[a + 2]) && (o = a, i > 0)); a = l[a + 3])
      ;
    return o;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let r = this.buffer, s = new Uint16Array(t - e), l = 0;
    for (let o = e, a = 0; o < t; ) {
      s[a++] = r[o++], s[a++] = r[o++] - i;
      let h = s[a++] = r[o++] - i;
      s[a++] = r[o++] - e, l = Math.max(l, h);
    }
    return new Xt(s, l, this.set);
  }
}
function $f(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function hn(n, e, t, i) {
  for (var r; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let l = !i && n instanceof de && n.index < 0 ? null : n.parent;
    if (!l)
      return n;
    n = l;
  }
  let s = i ? 0 : W.IgnoreOverlays;
  if (i)
    for (let l = n, o = l.parent; o; l = o, o = l.parent)
      l instanceof de && l.index < 0 && ((r = o.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != l.from && (n = o);
  for (; ; ) {
    let l = n.enter(e, t, s);
    if (!l)
      return n;
    n = l;
  }
}
class Pf {
  cursor(e = 0) {
    return new $r(this, e);
  }
  getChild(e, t = null, i = null) {
    let r = Aa(this, e, t, i);
    return r.length ? r[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return Aa(this, e, t, i);
  }
  resolve(e, t = 0) {
    return hn(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return hn(this, e, t, !0);
  }
  matchContext(e) {
    return Ql(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let r = t.lastChild;
      if (!r || r.to != t.to)
        break;
      r.type.isError && r.from == r.to ? (i = t, t = r.prevSibling) : t = r;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class de extends Pf {
  constructor(e, t, i, r) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = r;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, r, s = 0) {
    for (let l = this; ; ) {
      for (let { children: o, positions: a } = l._tree, h = t > 0 ? o.length : -1; e != h; e += t) {
        let c = o[e], f = a[e] + l.from, u;
        if (!(!(s & W.EnterBracketed && c instanceof _ && (u = ai.get(c)) && !u.overlay && u.bracketed && i >= f && i <= f + c.length) && !$f(r, i, f, f + c.length))) {
          if (c instanceof Xt) {
            if (s & W.ExcludeBuffers)
              continue;
            let O = c.findChild(0, c.buffer.length, t, i - f, r);
            if (O > -1)
              return new nt(new Cg(l, c, e, f), null, O);
          } else if (s & W.IncludeAnonymous || !c.type.isAnonymous || io(c)) {
            let O;
            if (!(s & W.IgnoreMounts) && (O = ai.get(c)) && !O.overlay)
              return new de(O.tree, f, e, l);
            let d = new de(c, f, e, l);
            return s & W.IncludeAnonymous || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, r, s);
          }
        }
      }
      if (s & W.IncludeAnonymous || !l.type.isAnonymous || (l.index >= 0 ? e = l.index + t : e = t < 0 ? -1 : l._parent._tree.children.length, l = l._parent, !l))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let r;
    if (!(i & W.IgnoreOverlays) && (r = ai.get(this._tree)) && r.overlay) {
      let s = e - this.from, l = i & W.EnterBracketed && r.bracketed;
      for (let { from: o, to: a } of r.overlay)
        if ((t > 0 || l ? o <= s : o < s) && (t < 0 || l ? a >= s : a > s))
          return new de(r.tree, r.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function Aa(n, e, t, i) {
  let r = n.cursor(), s = [];
  if (!r.firstChild())
    return s;
  if (t != null) {
    for (let l = !1; !l; )
      if (l = r.type.is(t), !r.nextSibling())
        return s;
  }
  for (; ; ) {
    if (i != null && r.type.is(i))
      return s;
    if (r.type.is(e) && s.push(r.node), !r.nextSibling())
      return i == null ? s : [];
  }
}
function Ql(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class Cg {
  constructor(e, t, i, r) {
    this.parent = e, this.buffer = t, this.index = i, this.start = r;
  }
}
class nt extends Pf {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, i);
    return s < 0 ? null : new nt(this.context, this, s);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & W.ExcludeBuffers)
      return null;
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return s < 0 ? null : new nt(this.context, this, s);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new nt(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new nt(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, r = this.index + 4, s = i.buffer[this.index + 3];
    if (s > r) {
      let l = i.buffer[this.index + 1];
      e.push(i.slice(r, s, l)), t.push(0);
    }
    return new _(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function vf(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let s = 1; s < n.length; s++) {
    let l = n[s];
    (l.from > t.from || l.to < t.to) && (t = l, e = s);
  }
  let i = t instanceof de && t.index < 0 ? null : t.parent, r = n.slice();
  return i ? r[e] = i : r.splice(e, 1), new Ag(r, t);
}
class Ag {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return vf(this.heads);
  }
}
function Xg(n, e, t) {
  let i = n.resolveInner(e, t), r = null;
  for (let s = i instanceof de ? i : i.context.parent; s; s = s.parent)
    if (s.index < 0) {
      let l = s.parent;
      (r || (r = [i])).push(l.resolve(e, t)), s = l;
    } else {
      let l = ai.get(s.tree);
      if (l && l.overlay && l.overlay[0].from <= e && l.overlay[l.overlay.length - 1].to >= e) {
        let o = new de(l.tree, l.overlay[0].from + s.from, -1, s);
        (r || (r = [i])).push(hn(o, e, t, !1));
      }
    }
  return r ? vf(r) : i;
}
class $r {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~W.EnterBracketed, e instanceof de)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: r } = this.buffer;
    return this.type = t || r.set.types[r.buffer[e]], this.from = i + r.buffer[e + 1], this.to = i + r.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof de ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: r } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, i);
    return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & W.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & W.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & W.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let r = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != r)
        return this.yieldBuf(t.findChild(
          r,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let r = t.buffer[this.index + 3];
      if (r < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(r);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: r } = this;
    if (r) {
      if (e > 0) {
        if (this.index < r.buffer.buffer.length)
          return !1;
      } else
        for (let s = 0; s < this.index; s++)
          if (r.buffer.buffer[s + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = r);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let s = t + e, l = e < 0 ? -1 : i._tree.children.length; s != l; s += e) {
          let o = i._tree.children[s];
          if (this.mode & W.IncludeAnonymous || o instanceof Xt || !o.type.isAnonymous || io(o))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let r = this.index, s = this.stack.length; s >= 0; ) {
        for (let l = e; l; l = l._parent)
          if (l.index == r) {
            if (r == this.index)
              return l;
            t = l, i = s + 1;
            break e;
          }
        r = this.stack[--s];
      }
    for (let r = i; r < this.stack.length; r++)
      t = new nt(this.buffer, t, this.stack[r]);
    return this.bufferNode = new nt(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let r = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (r = !0);
      }
      for (; ; ) {
        if (r && t && t(this), r = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, r = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return Ql(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
      if (s < 0)
        return Ql(this._tree, e, r);
      let l = i[t.buffer[this.stack[s]]];
      if (!l.isAnonymous) {
        if (e[r] && e[r] != l.name)
          return !1;
        r--;
      }
    }
    return !0;
  }
}
function io(n) {
  return n.children.some((e) => e instanceof Xt || !e.type.isAnonymous || io(e));
}
function Rg(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: r = wf, reused: s = [], minRepeatType: l = i.types.length } = n, o = Array.isArray(t) ? new to(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f($, v, x, L, B, N) {
    let { id: M, start: X, end: q, size: U } = o, oe = c, bt = h;
    if (U < 0)
      if (o.next(), U == -1) {
        let at = s[M];
        x.push(at), L.push(X - $);
        return;
      } else if (U == -3) {
        h = M;
        return;
      } else if (U == -4) {
        c = M;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${U}`);
    let Ai = a[M], Xn, Lt, Eo = X - $;
    if (q - X <= r && (Lt = g(o.pos - v, B))) {
      let at = new Uint16Array(Lt.size - Lt.skip), Re = o.pos - Lt.size, Ne = at.length;
      for (; o.pos > Re; )
        Ne = S(Lt.start, at, Ne);
      Xn = new Xt(at, q - Lt.start, i), Eo = Lt.start - $;
    } else {
      let at = o.pos - U;
      o.next();
      let Re = [], Ne = [], jt = M >= l ? M : -1, Kt = 0, Rn = q;
      for (; o.pos > at; )
        jt >= 0 && o.id == jt && o.size >= 0 ? (o.end <= Rn - r && (d(Re, Ne, X, Kt, o.end, Rn, jt, oe, bt), Kt = Re.length, Rn = o.end), o.next()) : N > 2500 ? u(X, at, Re, Ne) : f(X, at, Re, Ne, jt, N + 1);
      if (jt >= 0 && Kt > 0 && Kt < Re.length && d(Re, Ne, X, Kt, X, Rn, jt, oe, bt), Re.reverse(), Ne.reverse(), jt > -1 && Kt > 0) {
        let Yo = O(Ai, bt);
        Xn = no(Ai, Re, Ne, 0, Re.length, 0, q - X, Yo, Yo);
      } else
        Xn = p(Ai, Re, Ne, q - X, oe - q, bt);
    }
    x.push(Xn), L.push(Eo);
  }
  function u($, v, x, L) {
    let B = [], N = 0, M = -1;
    for (; o.pos > v; ) {
      let { id: X, start: q, end: U, size: oe } = o;
      if (oe > 4)
        o.next();
      else {
        if (M > -1 && q < M)
          break;
        M < 0 && (M = U - r), B.push(X, q, U), N++, o.next();
      }
    }
    if (N) {
      let X = new Uint16Array(N * 4), q = B[B.length - 2];
      for (let U = B.length - 3, oe = 0; U >= 0; U -= 3)
        X[oe++] = B[U], X[oe++] = B[U + 1] - q, X[oe++] = B[U + 2] - q, X[oe++] = oe;
      x.push(new Xt(X, B[2] - q, i)), L.push(q - $);
    }
  }
  function O($, v) {
    return (x, L, B) => {
      let N = 0, M = x.length - 1, X, q;
      if (M >= 0 && (X = x[M]) instanceof _) {
        if (!M && X.type == $ && X.length == B)
          return X;
        (q = X.prop(R.lookAhead)) && (N = L[M] + X.length + q);
      }
      return p($, x, L, B, N, v);
    };
  }
  function d($, v, x, L, B, N, M, X, q) {
    let U = [], oe = [];
    for (; $.length > L; )
      U.push($.pop()), oe.push(v.pop() + x - B);
    $.push(p(i.types[M], U, oe, N - B, X - N, q)), v.push(B - x);
  }
  function p($, v, x, L, B, N, M) {
    if (N) {
      let X = [R.contextHash, N];
      M = M ? [X].concat(M) : [X];
    }
    if (B > 25) {
      let X = [R.lookAhead, B];
      M = M ? [X].concat(M) : [X];
    }
    return new _($, v, x, L, M);
  }
  function g($, v) {
    let x = o.fork(), L = 0, B = 0, N = 0, M = x.end - r, X = { size: 0, start: 0, skip: 0 };
    e: for (let q = x.pos - $; x.pos > q; ) {
      let U = x.size;
      if (x.id == v && U >= 0) {
        X.size = L, X.start = B, X.skip = N, N += 4, L += 4, x.next();
        continue;
      }
      let oe = x.pos - U;
      if (U < 0 || oe < q || x.start < M)
        break;
      let bt = x.id >= l ? 4 : 0, Ai = x.start;
      for (x.next(); x.pos > oe; ) {
        if (x.size < 0)
          if (x.size == -3 || x.size == -4)
            bt += 4;
          else
            break e;
        else x.id >= l && (bt += 4);
        x.next();
      }
      B = Ai, L += U, N += bt;
    }
    return (v < 0 || L == $) && (X.size = L, X.start = B, X.skip = N), X.size > 4 ? X : void 0;
  }
  function S($, v, x) {
    let { id: L, start: B, end: N, size: M } = o;
    if (o.next(), M >= 0 && L < l) {
      let X = x;
      if (M > 4) {
        let q = o.pos - (M - 4);
        for (; o.pos > q; )
          x = S($, v, x);
      }
      v[--x] = X, v[--x] = N - $, v[--x] = B - $, v[--x] = L;
    } else M == -3 ? h = L : M == -4 && (c = L);
    return x;
  }
  let y = [], b = [];
  for (; o.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, y, b, -1, 0);
  let A = (e = n.length) !== null && e !== void 0 ? e : y.length ? b[0] + y[0].length : 0;
  return new _(a[n.topID], y.reverse(), b.reverse(), A);
}
const Xa = /* @__PURE__ */ new WeakMap();
function hr(n, e) {
  if (!n.isAnonymous || e instanceof Xt || e.type != n)
    return 1;
  let t = Xa.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof _)) {
        t = 1;
        break;
      }
      t += hr(n, i);
    }
    Xa.set(e, t);
  }
  return t;
}
function no(n, e, t, i, r, s, l, o, a) {
  let h = 0;
  for (let d = i; d < r; d++)
    h += hr(n, e[d]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function O(d, p, g, S, y) {
    for (let b = g; b < S; ) {
      let A = b, $ = p[b], v = hr(n, d[b]);
      for (b++; b < S; b++) {
        let x = hr(n, d[b]);
        if (v + x >= c)
          break;
        v += x;
      }
      if (b == A + 1) {
        if (v > c) {
          let x = d[A];
          O(x.children, x.positions, 0, x.children.length, p[A] + y);
          continue;
        }
        f.push(d[A]);
      } else {
        let x = p[b - 1] + d[b - 1].length - $;
        f.push(no(n, d, p, A, b, $, x, null, a));
      }
      u.push($ + y - s);
    }
  }
  return O(e, t, i, r, 0), (o || a)(f, u, l);
}
class Tf {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let r = this.map.get(e);
    r || this.map.set(e, r = /* @__PURE__ */ new Map()), r.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof nt ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof de && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof nt ? this.getBuffer(e.context.buffer, e.index) : e instanceof de ? this.map.get(e.tree) : void 0;
  }
  /**
  Set the value for the node that a cursor currently points to.
  */
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /**
  Retrieve the value for the node that a cursor currently points
  to.
  */
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class dt {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, r, s = !1, l = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = r, this.open = (s ? 1 : 0) | (l ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let r = [new dt(0, e.length, e, 0, !1, i)];
    for (let s of t)
      s.to > e.length && r.push(s);
    return r;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let r = [], s = 1, l = e.length ? e[0] : null;
    for (let o = 0, a = 0, h = 0; ; o++) {
      let c = o < t.length ? t[o] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; l && l.from < f; ) {
          let u = l;
          if (a >= u.from || f <= u.to || h) {
            let O = Math.max(u.from, a) - h, d = Math.min(u.to, f) - h;
            u = O >= d ? null : new dt(O, d, u.tree, u.offset + h, o > 0, !!c);
          }
          if (u && r.push(u), l.to > f)
            break;
          l = s < e.length ? e[s++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return r;
  }
}
class ro {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new Mg(e)), i = i ? i.length ? i.map((r) => new je(r.from, r.to)) : [new je(0, 0)] : [new je(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let r = this.startParse(e, t, i);
    for (; ; ) {
      let s = r.advance();
      if (s)
        return s;
    }
  }
}
class Mg {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
function Zf(n) {
  return (e, t, i, r) => new jg(e, n, t, i, r);
}
class Ra {
  constructor(e, t, i, r, s, l) {
    this.parser = e, this.parse = t, this.overlay = i, this.bracketed = r, this.target = s, this.from = l;
  }
}
function Ma(n) {
  if (!n.length || n.some((e) => e.from >= e.to))
    throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(n));
}
class Lg {
  constructor(e, t, i, r, s, l, o, a) {
    this.parser = e, this.predicate = t, this.mounts = i, this.index = r, this.start = s, this.bracketed = l, this.target = o, this.prev = a, this.depth = 0, this.ranges = [];
  }
}
const bl = new R({ perNode: !0 });
class jg {
  constructor(e, t, i, r, s) {
    this.nest = t, this.input = i, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
  }
  advance() {
    if (this.baseParse) {
      let i = this.baseParse.advance();
      if (!i)
        return null;
      if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
        for (let r of this.inner)
          r.parse.stopAt(this.stoppedAt);
    }
    if (this.innerDone == this.inner.length) {
      let i = this.baseTree;
      return this.stoppedAt != null && (i = new _(i.type, i.children, i.positions, i.length, i.propValues.concat([[bl, this.stoppedAt]]))), i;
    }
    let e = this.inner[this.innerDone], t = e.parse.advance();
    if (t) {
      this.innerDone++;
      let i = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
      i[R.mounted.id] = new ai(t, e.overlay, e.parser, e.bracketed), e.target.props = i;
    }
    return null;
  }
  get parsedPos() {
    if (this.baseParse)
      return 0;
    let e = this.input.length;
    for (let t = this.innerDone; t < this.inner.length; t++)
      this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
    return e;
  }
  stopAt(e) {
    if (this.stoppedAt = e, this.baseParse)
      this.baseParse.stopAt(e);
    else
      for (let t = this.innerDone; t < this.inner.length; t++)
        this.inner[t].parse.stopAt(e);
  }
  startInner() {
    let e = new zg(this.fragments), t = null, i = null, r = new $r(new de(this.baseTree, this.ranges[0].from, 0, null), W.IncludeAnonymous | W.IgnoreMounts);
    e: for (let s, l; ; ) {
      let o = !0, a;
      if (this.stoppedAt != null && r.from >= this.stoppedAt)
        o = !1;
      else if (e.hasNode(r)) {
        if (t) {
          let h = t.mounts.find((c) => c.frag.from <= r.from && c.frag.to >= r.to && c.mount.overlay);
          if (h)
            for (let c of h.mount.overlay) {
              let f = c.from + h.pos, u = c.to + h.pos;
              f >= r.from && u <= r.to && !t.ranges.some((O) => O.from < u && O.to > f) && t.ranges.push({ from: f, to: u });
            }
        }
        o = !1;
      } else if (i && (l = Eg(i.ranges, r.from, r.to)))
        o = l != 2;
      else if (!r.type.isAnonymous && (s = this.nest(r, this.input)) && (r.from < r.to || !s.overlay)) {
        r.tree || (Yg(r), t && t.depth++, i && i.depth++);
        let h = e.findMounts(r.from, s.parser);
        if (typeof s.overlay == "function")
          t = new Lg(s.parser, s.overlay, h, this.inner.length, r.from, !!s.bracketed, r.tree, t);
        else {
          let c = Ea(this.ranges, s.overlay || (r.from < r.to ? [new je(r.from, r.to)] : []));
          c.length && Ma(c), (c.length || !s.overlay) && this.inner.push(new Ra(s.parser, c.length ? s.parser.startParse(this.input, Ya(h, c), c) : s.parser.startParse(""), s.overlay ? s.overlay.map((f) => new je(f.from - r.from, f.to - r.from)) : null, !!s.bracketed, r.tree, c.length ? c[0].from : r.from)), s.overlay ? c.length && (i = { ranges: c, depth: 0, prev: i }) : o = !1;
        }
      } else if (t && (a = t.predicate(r)) && (a === !0 && (a = new je(r.from, r.to)), a.from < a.to)) {
        let h = t.ranges.length - 1;
        h >= 0 && t.ranges[h].to == a.from ? t.ranges[h] = { from: t.ranges[h].from, to: a.to } : t.ranges.push(a);
      }
      if (o && r.firstChild())
        t && t.depth++, i && i.depth++;
      else
        for (; !r.nextSibling(); ) {
          if (!r.parent())
            break e;
          if (t && !--t.depth) {
            let h = Ea(this.ranges, t.ranges);
            h.length && (Ma(h), this.inner.splice(t.index, 0, new Ra(t.parser, t.parser.startParse(this.input, Ya(t.mounts, h), h), t.ranges.map((c) => new je(c.from - t.start, c.to - t.start)), t.bracketed, t.target, h[0].from))), t = t.prev;
          }
          i && !--i.depth && (i = i.prev);
        }
    }
  }
}
function Eg(n, e, t) {
  for (let i of n) {
    if (i.from >= t)
      break;
    if (i.to > e)
      return i.from <= e && i.to >= t ? 2 : 1;
  }
  return 0;
}
function La(n, e, t, i, r, s) {
  if (e < t) {
    let l = n.buffer[e + 1];
    i.push(n.slice(e, t, l)), r.push(l - s);
  }
}
function Yg(n) {
  let { node: e } = n, t = [], i = e.context.buffer;
  do
    t.push(n.index), n.parent();
  while (!n.tree);
  let r = n.tree, s = r.children.indexOf(i), l = r.children[s], o = l.buffer, a = [s];
  function h(c, f, u, O, d, p) {
    let g = t[p], S = [], y = [];
    La(l, c, g, S, y, O);
    let b = o[g + 1], A = o[g + 2];
    a.push(S.length);
    let $ = p ? h(g + 4, o[g + 3], l.set.types[o[g]], b, A - b, p - 1) : e.toTree();
    return S.push($), y.push(b - O), La(l, o[g + 3], f, S, y, O), new _(u, S, y, d);
  }
  r.children[s] = h(0, o.length, le.none, 0, l.length, t.length - 1);
  for (let c of a) {
    let f = n.tree.children[c], u = n.tree.positions[c];
    n.yield(new de(f, u + n.from, c, n._tree));
  }
}
class ja {
  constructor(e, t) {
    this.offset = t, this.done = !1, this.cursor = e.cursor(W.IncludeAnonymous | W.IgnoreMounts);
  }
  // Move to the first node (in pre-order) that starts at or after `pos`.
  moveTo(e) {
    let { cursor: t } = this, i = e - this.offset;
    for (; !this.done && t.from < i; )
      if (!(t.to >= e && t.enter(i, 1, W.IgnoreOverlays | W.ExcludeBuffers))) if (t.to <= e)
        t.next(!1) || (this.done = !0);
      else
        break;
  }
  hasNode(e) {
    if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
      for (let t = this.cursor.tree; ; ) {
        if (t == e.tree)
          return !0;
        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof _)
          t = t.children[0];
        else
          break;
      }
    return !1;
  }
}
let zg = class {
  constructor(e) {
    var t;
    if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
      let i = this.curFrag = e[0];
      this.curTo = (t = i.tree.prop(bl)) !== null && t !== void 0 ? t : i.to, this.inner = new ja(i.tree, -i.offset);
    } else
      this.curFrag = this.inner = null;
  }
  hasNode(e) {
    for (; this.curFrag && e.from >= this.curTo; )
      this.nextFrag();
    return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
  }
  nextFrag() {
    var e;
    if (this.fragI++, this.fragI == this.fragments.length)
      this.curFrag = this.inner = null;
    else {
      let t = this.curFrag = this.fragments[this.fragI];
      this.curTo = (e = t.tree.prop(bl)) !== null && e !== void 0 ? e : t.to, this.inner = new ja(t.tree, -t.offset);
    }
  }
  findMounts(e, t) {
    var i;
    let r = [];
    if (this.inner) {
      this.inner.cursor.moveTo(e, 1);
      for (let s = this.inner.cursor.node; s; s = s.parent) {
        let l = (i = s.tree) === null || i === void 0 ? void 0 : i.prop(R.mounted);
        if (l && l.parser == t)
          for (let o = this.fragI; o < this.fragments.length; o++) {
            let a = this.fragments[o];
            if (a.from >= s.to)
              break;
            a.tree == this.curFrag.tree && r.push({
              frag: a,
              pos: s.from - a.offset,
              mount: l
            });
          }
      }
    }
    return r;
  }
};
function Ea(n, e) {
  let t = null, i = e;
  for (let r = 1, s = 0; r < n.length; r++) {
    let l = n[r - 1].to, o = n[r].from;
    for (; s < i.length; s++) {
      let a = i[s];
      if (a.from >= o)
        break;
      a.to <= l || (t || (i = t = e.slice()), a.from < l ? (t[s] = new je(a.from, l), a.to > o && t.splice(s + 1, 0, new je(o, a.to))) : a.to > o ? t[s--] = new je(o, a.to) : t.splice(s--, 1));
    }
  }
  return i;
}
function _g(n, e, t, i) {
  let r = 0, s = 0, l = !1, o = !1, a = -1e9, h = [];
  for (; ; ) {
    let c = r == n.length ? 1e9 : l ? n[r].to : n[r].from, f = s == e.length ? 1e9 : o ? e[s].to : e[s].from;
    if (l != o) {
      let u = Math.max(a, t), O = Math.min(c, f, i);
      u < O && h.push(new je(u, O));
    }
    if (a = Math.min(c, f), a == 1e9)
      break;
    c == a && (l ? (l = !1, r++) : l = !0), f == a && (o ? (o = !1, s++) : o = !0);
  }
  return h;
}
function Ya(n, e) {
  let t = [];
  for (let { pos: i, mount: r, frag: s } of n) {
    let l = i + (r.overlay ? r.overlay[0].from : 0), o = l + r.tree.length, a = Math.max(s.from, l), h = Math.min(s.to, o);
    if (r.overlay) {
      let c = r.overlay.map((u) => new je(u.from + i, u.to + i)), f = _g(e, c, a, h);
      for (let u = 0, O = a; ; u++) {
        let d = u == f.length, p = d ? h : f[u].from;
        if (p > O && t.push(new dt(O, p, r.tree, -l, s.from >= O || s.openStart, s.to <= p || s.openEnd)), d)
          break;
        O = f[u].to;
      }
    } else
      t.push(new dt(a, h, r.tree, -l, s.from >= l || s.openStart, s.to <= o || s.openEnd));
  }
  return t;
}
let Wg = 0;
class Ce {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.name = e, this.set = t, this.base = i, this.modified = r, this.id = Wg++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof Ce && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let r = new Ce(i, [], null, []);
    if (r.set.push(r), t)
      for (let s of t.set)
        r.set.push(s);
    return r;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new Pr(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : Pr.get(i.base || i, i.modified.concat(t).sort((r, s) => r.id - s.id));
  }
}
let Bg = 0;
class Pr {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Bg++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((o) => o.base == e && Vg(t, o.modified));
    if (i)
      return i;
    let r = [], s = new Ce(e.name, r, e, t);
    for (let o of t)
      o.instances.push(s);
    let l = qg(t);
    for (let o of e.set)
      if (!o.modified.length)
        for (let a of l)
          r.push(Pr.get(o, a));
    return s;
  }
}
function Vg(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function qg(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, r = e.length; i < r; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function Pi(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let r of t.split(" "))
      if (r) {
        let s = [], l = 2, o = r;
        for (let f = 0; ; ) {
          if (o == "..." && f > 0 && f + 3 == r.length) {
            l = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(o);
          if (!u)
            throw new RangeError("Invalid path: " + r);
          if (s.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == r.length)
            break;
          let O = r[f++];
          if (f == r.length && O == "!") {
            l = 0;
            break;
          }
          if (O != "/")
            throw new RangeError("Invalid path: " + r);
          o = r.slice(f);
        }
        let a = s.length - 1, h = s[a];
        if (!h)
          throw new RangeError("Invalid path: " + r);
        let c = new cn(i, l, a > 0 ? s.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return Cf.add(e);
}
const Cf = new R({
  combine(n, e) {
    let t, i, r;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (r = e, e = e.next) : (r = n, n = n.next), t && t.mode == r.mode && !r.context && !t.context)
        continue;
      let s = new cn(r.tags, r.mode, r.context);
      t ? t.next = s : i = s, t = s;
    }
    return i;
  }
});
class cn {
  constructor(e, t, i, r) {
    this.tags = e, this.mode = t, this.context = i, this.next = r;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
cn.empty = new cn([], 2, null);
function Dg(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let s of n)
    if (!Array.isArray(s.tag))
      t[s.tag.id] = s.class;
    else
      for (let l of s.tag)
        t[l.id] = s.class;
  let { scope: i, all: r = null } = {};
  return {
    style: (s) => {
      let l = r;
      for (let o of s)
        for (let a of o.set) {
          let h = t[a.id];
          if (h) {
            l = l ? l + " " + h : h;
            break;
          }
        }
      return l;
    },
    scope: i
  };
}
function Ig(n, e) {
  let t = null;
  for (let i of n) {
    let r = i.style(e);
    r && (t = t ? t + " " + r : r);
  }
  return t;
}
function Gg(n, e, t, i = 0, r = n.length) {
  let s = new Ng(i, Array.isArray(e) ? e : [e], t);
  s.highlightRange(n.cursor(), i, r, "", s.highlighters), s.flush(r);
}
class Ng {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, r, s) {
    let { type: l, from: o, to: a } = e;
    if (o >= i || a <= t)
      return;
    l.isTop && (s = this.highlighters.filter((O) => !O.scope || O.scope(l)));
    let h = r, c = Ug(e) || cn.empty, f = Ig(s, c.tags);
    if (f && (h && (h += " "), h += f, c.mode == 1 && (r += (r ? " " : "") + f)), this.startSpan(Math.max(t, o), h), c.opaque)
      return;
    let u = e.tree && e.tree.prop(R.mounted);
    if (u && u.overlay) {
      let O = e.node.enter(u.overlay[0].from + o, 1), d = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), p = e.firstChild();
      for (let g = 0, S = o; ; g++) {
        let y = g < u.overlay.length ? u.overlay[g] : null, b = y ? y.from + o : a, A = Math.max(t, S), $ = Math.min(i, b);
        if (A < $ && p)
          for (; e.from < $ && (this.highlightRange(e, A, $, r, s), this.startSpan(Math.min($, e.to), h), !(e.to >= b || !e.nextSibling())); )
            ;
        if (!y || b > i)
          break;
        S = y.to + o, S > t && (this.highlightRange(O.cursor(), Math.max(t, y.from + o), Math.min(i, S), "", d), this.startSpan(Math.min(i, S), h));
      }
      p && e.parent();
    } else if (e.firstChild()) {
      u && (r = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, r, s), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function Ug(n) {
  let e = n.type.prop(Cf);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const w = Ce.define, In = w(), kt = w(), za = w(kt), _a = w(kt), xt = w(), Gn = w(xt), gs = w(xt), Ke = w(), Et = w(Ke), Fe = w(), He = w(), yl = w(), Mi = w(yl), Nn = w(), m = {
  /**
  A comment.
  */
  comment: In,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: w(In),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: w(In),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: w(In),
  /**
  Any kind of identifier.
  */
  name: kt,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: w(kt),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: za,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: w(za),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: _a,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: w(_a),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: w(kt),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: w(kt),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: w(kt),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: w(kt),
  /**
  A literal value.
  */
  literal: xt,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Gn,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: w(Gn),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: w(Gn),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: w(Gn),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: gs,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: w(gs),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: w(gs),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: w(xt),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: w(xt),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: w(xt),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: w(xt),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: w(xt),
  /**
  A language keyword.
  */
  keyword: Fe,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: w(Fe),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: w(Fe),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: w(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: w(Fe),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: w(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: w(Fe),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: w(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: w(Fe),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: w(Fe),
  /**
  An operator.
  */
  operator: He,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: w(He),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: w(He),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: w(He),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: w(He),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: w(He),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: w(He),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: w(He),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: w(He),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: w(He),
  /**
  Program or markup punctuation.
  */
  punctuation: yl,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: w(yl),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Mi,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: w(Mi),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: w(Mi),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: w(Mi),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: w(Mi),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ke,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Et,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: w(Et),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: w(Et),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: w(Et),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: w(Et),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: w(Et),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: w(Et),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: w(Ke),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: w(Ke),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: w(Ke),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: w(Ke),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: w(Ke),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: w(Ke),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: w(Ke),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: w(Ke),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: w(),
  /**
  Deleted text.
  */
  deleted: w(),
  /**
  Changed text.
  */
  changed: w(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: w(),
  /**
  Metadata or meta-instruction.
  */
  meta: Nn,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: w(Nn),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: w(Nn),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: w(Nn),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Ce.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Ce.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Ce.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Ce.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Ce.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Ce.defineModifier("special")
};
for (let n in m) {
  let e = m[n];
  e instanceof Ce && (e.name = n);
}
Dg([
  { tag: m.link, class: "tok-link" },
  { tag: m.heading, class: "tok-heading" },
  { tag: m.emphasis, class: "tok-emphasis" },
  { tag: m.strong, class: "tok-strong" },
  { tag: m.keyword, class: "tok-keyword" },
  { tag: m.atom, class: "tok-atom" },
  { tag: m.bool, class: "tok-bool" },
  { tag: m.url, class: "tok-url" },
  { tag: m.labelName, class: "tok-labelName" },
  { tag: m.inserted, class: "tok-inserted" },
  { tag: m.deleted, class: "tok-deleted" },
  { tag: m.literal, class: "tok-literal" },
  { tag: m.string, class: "tok-string" },
  { tag: m.number, class: "tok-number" },
  { tag: [m.regexp, m.escape, m.special(m.string)], class: "tok-string2" },
  { tag: m.variableName, class: "tok-variableName" },
  { tag: m.local(m.variableName), class: "tok-variableName tok-local" },
  { tag: m.definition(m.variableName), class: "tok-variableName tok-definition" },
  { tag: m.special(m.variableName), class: "tok-variableName2" },
  { tag: m.definition(m.propertyName), class: "tok-propertyName tok-definition" },
  { tag: m.typeName, class: "tok-typeName" },
  { tag: m.namespace, class: "tok-namespace" },
  { tag: m.className, class: "tok-className" },
  { tag: m.macroName, class: "tok-macroName" },
  { tag: m.propertyName, class: "tok-propertyName" },
  { tag: m.operator, class: "tok-operator" },
  { tag: m.comment, class: "tok-comment" },
  { tag: m.meta, class: "tok-meta" },
  { tag: m.invalid, class: "tok-invalid" },
  { tag: m.punctuation, class: "tok-punctuation" }
]);
var ms;
const ii = /* @__PURE__ */ new R();
function so(n) {
  return T.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const lo = /* @__PURE__ */ new R();
class Be {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], r = "") {
    this.data = e, this.name = r, z.prototype.hasOwnProperty("tree") || Object.defineProperty(z.prototype, "tree", { get() {
      return re(this);
    } }), this.parser = t, this.extension = [
      It.of(this),
      z.languageData.of((s, l, o) => {
        let a = Wa(s, l, o), h = a.type.prop(ii);
        if (!h)
          return [];
        let c = s.facet(h), f = a.type.prop(lo);
        if (f) {
          let u = a.resolve(l - a.from, o);
          for (let O of f)
            if (O.test(u, s)) {
              let d = s.facet(O.facet);
              return O.type == "replace" ? d : d.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return Wa(e, t, i).type.prop(ii) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(It);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], r = (s, l) => {
      if (s.prop(ii) == this.data) {
        i.push({ from: l, to: l + s.length });
        return;
      }
      let o = s.prop(R.mounted);
      if (o) {
        if (o.tree.prop(ii) == this.data) {
          if (o.overlay)
            for (let a of o.overlay)
              i.push({ from: a.from + l, to: a.to + l });
          else
            i.push({ from: l, to: l + s.length });
          return;
        } else if (o.overlay) {
          let a = i.length;
          if (r(o.tree, o.overlay[0].from + l), i.length > a)
            return;
        }
      }
      for (let a = 0; a < s.children.length; a++) {
        let h = s.children[a];
        h instanceof _ && r(h, s.positions[a] + l);
      }
    };
    return r(re(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Be.setState = /* @__PURE__ */ I.define();
function Wa(n, e, t) {
  let i = n.facet(It), r = re(n).topNode;
  if (!i || i.allowsNesting)
    for (let s = r; s; s = s.enter(e, t, W.ExcludeBuffers | W.EnterBracketed))
      s.type.isTop && (r = s);
  return r;
}
class gi extends Be {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = so(e.languageData);
    return new gi(t, e.parser.configure({
      props: [ii.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new gi(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function re(n) {
  let e = n.field(Be.state, !1);
  return e ? e.tree : _.empty;
}
class Fg {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let Li = null;
class fn {
  constructor(e, t, i = [], r, s, l, o, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = r, this.treeLen = s, this.viewport = l, this.skipped = o, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new fn(e, t, [], _.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new Fg(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != _.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let r = Date.now() + e;
        e = () => Date.now() > r;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let r = this.parse.advance();
        if (r)
          if (this.fragments = this.withoutTempSkipped(dt.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(dt.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Li;
    Li = this;
    try {
      return e();
    } finally {
      Li = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Ba(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: r, treeLen: s, viewport: l, skipped: o } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), i = dt.applyChanges(i, a), r = _.empty, s = 0, l = { from: e.mapPos(l.from, -1), to: e.mapPos(l.to, 1) }, this.skipped.length) {
        o = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && o.push({ from: c, to: f });
        }
      }
    }
    return new fn(this.parser, t, i, r, s, l, o, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: r, to: s } = this.skipped[i];
      r < e.to && s > e.from && (this.fragments = Ba(this.fragments, r, s), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends ro {
      createParse(t, i, r) {
        let s = r[0].from, l = r[r.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let a = Li;
            if (a) {
              for (let h of r)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = l, new _(le.none, [], [], l - s);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return Li;
  }
}
function Ba(n, e, t) {
  return dt.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class mi {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new mi(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = fn.create(e.facet(It).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new mi(i);
  }
}
Be.state = /* @__PURE__ */ Ae.define({
  create: mi.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(Be.setState))
        return t.value;
    return e.startState.facet(It) != e.state.facet(It) ? mi.init(e.state) : n.apply(e);
  }
});
let Af = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Af = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Ss = typeof navigator < "u" && (!((ms = navigator.scheduling) === null || ms === void 0) && ms.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Hg = /* @__PURE__ */ At.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(Be.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(Be.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Af(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: r } } = this.view, s = i.field(Be.state);
    if (s.tree == s.context.tree && s.context.isDone(
      r + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let l = Date.now() + Math.min(this.chunkBudget, 100, e && !Ss ? Math.max(25, e.timeRemaining() - 5) : 1e9), o = s.context.treeLen < r && i.doc.length > r + 1e3, a = s.context.work(() => Ss && Ss() || Date.now() > l, r + (o ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: Be.setState.of(new mi(s.context)) })), this.chunkBudget > 0 && !(a && !o) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => it(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), It = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    Be.state,
    Hg,
    C.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class un {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
class vr {
  constructor(e, t, i, r, s, l = void 0) {
    this.name = e, this.alias = t, this.extensions = i, this.filename = r, this.loadFunc = s, this.support = l, this.loading = null;
  }
  /**
  Start loading the the language. Will return a promise that
  resolves to a [`LanguageSupport`](https://codemirror.net/6/docs/ref/#language.LanguageSupport)
  object when the language successfully loads.
  */
  load() {
    return this.loading || (this.loading = this.loadFunc().then((e) => this.support = e, (e) => {
      throw this.loading = null, e;
    }));
  }
  /**
  Create a language description.
  */
  static of(e) {
    let { load: t, support: i } = e;
    if (!t) {
      if (!i)
        throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
      t = () => Promise.resolve(i);
    }
    return new vr(e.name, (e.alias || []).concat(e.name).map((r) => r.toLowerCase()), e.extensions || [], e.filename, t, i);
  }
  /**
  Look for a language in the given array of descriptions that
  matches the filename. Will first match
  [`filename`](https://codemirror.net/6/docs/ref/#language.LanguageDescription.filename) patterns,
  and then [extensions](https://codemirror.net/6/docs/ref/#language.LanguageDescription.extensions),
  and return the first language that matches.
  */
  static matchFilename(e, t) {
    for (let r of e)
      if (r.filename && r.filename.test(t))
        return r;
    let i = /\.([^.]+)$/.exec(t);
    if (i) {
      for (let r of e)
        if (r.extensions.indexOf(i[1]) > -1)
          return r;
    }
    return null;
  }
  /**
  Look for a language whose name or alias matches the the given
  name (case-insensitively). If `fuzzy` is true, and no direct
  matchs is found, this'll also search for a language whose name
  or alias occurs in the string (for names shorter than three
  characters, only when surrounded by non-word characters).
  */
  static matchLanguageName(e, t, i = !0) {
    t = t.toLowerCase();
    for (let r of e)
      if (r.alias.some((s) => s == t))
        return r;
    if (i)
      for (let r of e)
        for (let s of r.alias) {
          let l = t.indexOf(s);
          if (l > -1 && (s.length > 2 || !/\w/.test(t[l - 1]) && !/\w/.test(t[l + s.length])))
            return r;
        }
    return null;
  }
}
const Kg = /* @__PURE__ */ T.define(), $n = /* @__PURE__ */ T.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function Tr(n) {
  let e = n.facet($n);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function Zr(n, e) {
  let t = "", i = n.tabSize, r = n.facet($n)[0];
  if (r == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    r = " ";
  }
  for (let s = 0; s < e; s++)
    t += r;
  return t;
}
function Xf(n, e) {
  n instanceof z && (n = new Gr(n));
  for (let i of n.state.facet(Kg)) {
    let r = i(n, e);
    if (r !== void 0)
      return r;
  }
  let t = re(n.state);
  return t.length >= e ? Jg(n, t, e) : null;
}
class Gr {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Tr(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: s } = this.options;
    return r != null && r >= i.from && r <= i.to ? s && r == e ? { text: "", from: e } : (t < 0 ? r < e : r <= e) ? { text: i.text.slice(r - i.from), from: r } : { text: i.text.slice(0, r - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: r } = this.lineAt(e, t);
    return i.slice(e - r, Math.min(i.length, e + 100 - r));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.countColumn(i, e - r), l = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
    return l > -1 && (s += l - this.countColumn(i, i.search(/\S|$/))), s;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return gt(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.options.overrideIndentation;
    if (s) {
      let l = s(r);
      if (l > -1)
        return l;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Pn = /* @__PURE__ */ new R();
function Jg(n, e, t) {
  let i = e.resolveStack(t), r = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (r != i.node) {
    let s = [];
    for (let l = r; l && !(l.from < i.node.from || l.to > i.node.to || l.from == i.node.from && l.type == i.node.type); l = l.parent)
      s.push(l);
    for (let l = s.length - 1; l >= 0; l--)
      i = { node: s[l], next: i };
  }
  return Rf(i, n, t);
}
function Rf(n, e, t) {
  for (let i = n; i; i = i.next) {
    let r = tm(i.node);
    if (r)
      return r(oo.create(e, t, i));
  }
  return 0;
}
function em(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function tm(n) {
  let e = n.type.prop(Pn);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(R.closedBy))) {
    let r = n.lastChild, s = r && i.indexOf(r.name) > -1;
    return (l) => Mf(l, !0, 1, void 0, s && !em(l) ? r.from : void 0);
  }
  return n.parent == null ? im : null;
}
function im() {
  return 0;
}
class oo extends Gr {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new oo(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (nm(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return Rf(this.context.next, this.base, this.pos);
  }
}
function nm(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function rm(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let r = n.options.simulateBreak, s = n.state.doc.lineAt(t.from), l = r == null || r <= s.from ? s.to : Math.min(s.to, r);
  for (let o = t.to; ; ) {
    let a = e.childAfter(o);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= l)
        return null;
      let h = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    o = a.to;
  }
}
function sm({ closing: n, align: e = !0, units: t = 1 }) {
  return (i) => Mf(i, e, t, n);
}
function Mf(n, e, t, i, r) {
  let s = n.textAfter, l = s.match(/^\s*/)[0].length, o = i && s.slice(l, l + i.length) == i || r == n.pos + l, a = e ? rm(n) : null;
  return a ? o ? n.column(a.from) : n.column(a.to) : n.baseIndent + (o ? 0 : n.unit * t);
}
const lm = (n) => n.baseIndent;
function cr({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let i = n && n.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const om = /* @__PURE__ */ T.define(), vn = /* @__PURE__ */ new R();
function Lf(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
const am = /* @__PURE__ */ T.define(), hm = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function cm(n) {
  let e = n.facet(am);
  return e.length ? e : n.facet(hm);
}
function fm(n, e, t) {
  let i = cm(n), r = null;
  if (i) {
    for (let s of i)
      if (!s.scope || t) {
        let l = s.style(e);
        l && (r = r ? r + " " + l : l);
      }
  }
  return r;
}
const um = 1e4, Om = "()[]{}", jf = /* @__PURE__ */ new R();
function kl(n, e, t) {
  let i = n.prop(e < 0 ? R.openedBy : R.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let r = t.indexOf(n.name);
    if (r > -1 && r % 2 == (e < 0 ? 1 : 0))
      return [t[r + e]];
  }
  return null;
}
function xl(n) {
  let e = n.type.prop(jf);
  return e ? e(n.node) : n;
}
function ni(n, e, t, i = {}) {
  let r = i.maxScanDistance || um, s = i.brackets || Om, l = re(n), o = l.resolveInner(e, t);
  for (let a = o; a; a = a.parent) {
    let h = kl(a.type, t, s);
    if (h && a.from < a.to) {
      let c = xl(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return dm(n, e, t, a, c, h, s);
    }
  }
  return pm(n, e, t, l, o.type, r, s);
}
function dm(n, e, t, i, r, s, l) {
  let o = i.parent, a = { from: r.from, to: r.to }, h = 0, c = o == null ? void 0 : o.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && s.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = xl(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (kl(c.type, t, l))
          h++;
        else if (kl(c.type, -t, l)) {
          if (h == 0) {
            let f = xl(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function pm(n, e, t, i, r, s, l) {
  if (t < 0 ? !e : e == n.doc.length)
    return null;
  let o = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = l.indexOf(o);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= s; ) {
    let O = c.value;
    t < 0 && (u += O.length);
    let d = e + u * t;
    for (let p = t > 0 ? 0 : O.length - 1, g = t > 0 ? O.length : -1; p != g; p += t) {
      let S = l.indexOf(O[p]);
      if (!(S < 0 || i.resolveInner(d + p, 1).type != r))
        if (S % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: d + p, to: d + p + 1 }, matched: S >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (u += O.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const gm = /* @__PURE__ */ Object.create(null), Va = [le.none], qa = [], Da = /* @__PURE__ */ Object.create(null), mm = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  mm[n] = /* @__PURE__ */ Sm(gm, e);
function Qs(n, e) {
  qa.indexOf(n) > -1 || (qa.push(n), console.warn(e));
}
function Sm(n, e) {
  let t = [];
  for (let o of e.split(" ")) {
    let a = [];
    for (let h of o.split(".")) {
      let c = n[h] || m[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : Qs(h, `Modifier ${h} used at start of tag`) : a.length ? Qs(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : Qs(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), r = i + " " + t.map((o) => o.id), s = Da[r];
  if (s)
    return s.id;
  let l = Da[r] = le.define({
    id: Va.length,
    name: i,
    props: [Pi({ [i]: t })]
  });
  return Va.push(l), l.id;
}
te.RTL, te.LTR;
const Qm = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = ho(n.state, t.from);
  return i.line ? bm(n) : i.block ? km(n) : !1;
};
function ao(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let r = n(e, t);
    return r ? (i(t.update(r)), !0) : !1;
  };
}
const bm = /* @__PURE__ */ ao(
  $m,
  0
  /* CommentOption.Toggle */
), ym = /* @__PURE__ */ ao(
  Ef,
  0
  /* CommentOption.Toggle */
), km = /* @__PURE__ */ ao(
  (n, e) => Ef(n, e, wm(e)),
  0
  /* CommentOption.Toggle */
);
function ho(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const ji = 50;
function xm(n, { open: e, close: t }, i, r) {
  let s = n.sliceDoc(i - ji, i), l = n.sliceDoc(r, r + ji), o = /\s*$/.exec(s)[0].length, a = /^\s*/.exec(l)[0].length, h = s.length - o;
  if (s.slice(h - e.length, h) == e && l.slice(a, a + t.length) == t)
    return {
      open: { pos: i - o, margin: o && 1 },
      close: { pos: r + a, margin: a && 1 }
    };
  let c, f;
  r - i <= 2 * ji ? c = f = n.sliceDoc(i, r) : (c = n.sliceDoc(i, i + ji), f = n.sliceDoc(r - ji, r));
  let u = /^\s*/.exec(c)[0].length, O = /\s*$/.exec(f)[0].length, d = f.length - O - t.length;
  return c.slice(u, u + e.length) == e && f.slice(d, d + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: r - O - t.length,
      margin: /\s/.test(f.charAt(d - 1)) ? 1 : 0
    }
  } : null;
}
function wm(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), r = t.to <= i.to ? i : n.doc.lineAt(t.to);
    r.from > i.from && r.from == t.to && (r = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let s = e.length - 1;
    s >= 0 && e[s].to > i.from ? e[s].to = r.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: r.to });
  }
  return e;
}
function Ef(n, e, t = e.selection.ranges) {
  let i = t.map((s) => ho(e, s.from).block);
  if (!i.every((s) => s))
    return null;
  let r = t.map((s, l) => xm(e, i[l], s.from, s.to));
  if (n != 2 && !r.every((s) => s))
    return { changes: e.changes(t.map((s, l) => r[l] ? [] : [{ from: s.from, insert: i[l].open + " " }, { from: s.to, insert: " " + i[l].close }])) };
  if (n != 1 && r.some((s) => s)) {
    let s = [];
    for (let l = 0, o; l < r.length; l++)
      if (o = r[l]) {
        let a = i[l], { open: h, close: c } = o;
        s.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: s };
  }
  return null;
}
function $m(n, e, t = e.selection.ranges) {
  let i = [], r = -1;
  e: for (let { from: s, to: l } of t) {
    let o = i.length, a = 1e9, h;
    for (let c = s; c <= l; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = ho(e, f.from).line, !h))
        continue e;
      if (f.from > r && (s == l || l > f.from)) {
        r = f.from;
        let u = /^\s*/.exec(f.text)[0].length, O = u == f.length, d = f.text.slice(u, u + h.length) == h ? u : -1;
        u < f.text.length && u < a && (a = u), i.push({ line: f, comment: d, token: h, indent: u, empty: O, single: !1 });
      }
      c = f.to + 1;
    }
    if (a < 1e9)
      for (let c = o; c < i.length; c++)
        i[c].indent < i[c].line.text.length && (i[c].indent = a);
    i.length == o + 1 && (i[o].single = !0);
  }
  if (n != 2 && i.some((s) => s.comment < 0 && (!s.empty || s.single))) {
    let s = [];
    for (let { line: o, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && s.push({ from: o.from + h, insert: a + " " });
    let l = e.changes(s);
    return { changes: l, selection: e.selection.map(l, 1) };
  } else if (n != 1 && i.some((s) => s.comment >= 0)) {
    let s = [];
    for (let { line: l, comment: o, token: a } of i)
      if (o >= 0) {
        let h = l.from + o, c = h + a.length;
        l.text[c - l.from] == " " && c++, s.push({ from: h, to: c });
      }
    return { changes: s };
  }
  return null;
}
const wl = /* @__PURE__ */ Qt.define(), Pm = /* @__PURE__ */ Qt.define(), vm = /* @__PURE__ */ T.define(), Yf = /* @__PURE__ */ T.define({
  combine(n) {
    return wc(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, r) => e(i, r) || t(i, r)
    });
  }
}), zf = /* @__PURE__ */ Ae.define({
  create() {
    return rt.empty;
  },
  update(n, e) {
    let t = e.state.facet(Yf), i = e.annotation(wl);
    if (i) {
      let a = xe.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
      return a ? c = Cr(c, c.length, t.minDepth, a) : c = Bf(c, e.startState.selection), new rt(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
    }
    let r = e.annotation(Pm);
    if ((r == "full" || r == "before") && (n = n.isolate()), e.annotation(ee.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let s = xe.fromTransaction(e), l = e.annotation(ee.time), o = e.annotation(ee.userEvent);
    return s ? n = n.addChanges(s, l, o, t, e) : e.selection && (n = n.addSelection(e.startState.selection, l, o, t.newGroupDelay)), (r == "full" || r == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new rt(n.done.map(xe.fromJSON), n.undone.map(xe.fromJSON));
  }
});
function Tm(n = {}) {
  return [
    zf,
    Yf.of(n),
    C.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? _f : e.inputType == "historyRedo" ? $l : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function Nr(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let r = t.field(zf, !1);
    if (!r)
      return !1;
    let s = r.pop(n, t, e);
    return s ? (i(s), !0) : !1;
  };
}
const _f = /* @__PURE__ */ Nr(0, !1), $l = /* @__PURE__ */ Nr(1, !1), Zm = /* @__PURE__ */ Nr(0, !0), Cm = /* @__PURE__ */ Nr(1, !0);
class xe {
  constructor(e, t, i, r, s) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = r, this.selectionsAfter = s;
  }
  setSelAfter(e) {
    return new xe(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((r) => r.toJSON())
    };
  }
  static fromJSON(e) {
    return new xe(e.changes && ie.fromJSON(e.changes), [], e.mapped && st.fromJSON(e.mapped), e.startSelection && Q.fromJSON(e.startSelection), e.selectionsAfter.map(Q.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = Ee;
    for (let r of e.startState.facet(vm)) {
      let s = r(e);
      s.length && (i = i.concat(s));
    }
    return !i.length && e.changes.empty ? null : new xe(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Ee);
  }
  static selection(e) {
    return new xe(void 0, Ee, void 0, void 0, e);
  }
}
function Cr(n, e, t, i) {
  let r = e + 1 > t + 20 ? e - t - 1 : 0, s = n.slice(r, e);
  return s.push(i), s;
}
function Am(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, l, o) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      o >= h && l <= c && (i = !0);
    }
  }), i;
}
function Xm(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Wf(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const Ee = [], Rm = 200;
function Bf(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Rm));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), Cr(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [xe.selection([e])];
}
function Mm(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function bs(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = Ee;
  for (; t; ) {
    let r = Lm(n[t - 1], e, i);
    if (r.changes && !r.changes.empty || r.effects.length) {
      let s = n.slice(0, t);
      return s[t - 1] = r, s;
    } else
      e = r.mapped, t--, i = r.selectionsAfter;
  }
  return i.length ? [xe.selection(i)] : Ee;
}
function Lm(n, e, t) {
  let i = Wf(n.selectionsAfter.length ? n.selectionsAfter.map((o) => o.map(e)) : Ee, t);
  if (!n.changes)
    return xe.selection(i);
  let r = n.changes.map(e), s = e.mapDesc(n.changes, !0), l = n.mapped ? n.mapped.composeDesc(s) : s;
  return new xe(r, I.mapEffects(n.effects, e), l, n.startSelection.map(s), i);
}
const jm = /^(input\.type|delete)($|\.)/;
class rt {
  constructor(e, t, i = 0, r = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = r;
  }
  isolate() {
    return this.prevTime ? new rt(this.done, this.undone) : this;
  }
  addChanges(e, t, i, r, s) {
    let l = this.done, o = l[l.length - 1];
    return o && o.changes && !o.changes.empty && e.changes && (!i || jm.test(i)) && (!o.selectionsAfter.length && t - this.prevTime < r.newGroupDelay && r.joinToEvent(s, Am(o.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? l = Cr(l, l.length - 1, r.minDepth, new xe(e.changes.compose(o.changes), Wf(I.mapEffects(e.effects, o.changes), o.effects), o.mapped, o.startSelection, Ee)) : l = Cr(l, l.length, r.minDepth, e), new rt(l, Ee, t, i);
  }
  addSelection(e, t, i, r) {
    let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Ee;
    return s.length > 0 && t - this.prevTime < r && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Xm(s[s.length - 1], e) ? this : new rt(Bf(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new rt(bs(this.done, e), bs(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let r = e == 0 ? this.done : this.undone;
    if (r.length == 0)
      return null;
    let s = r[r.length - 1], l = s.selectionsAfter[0] || (s.startSelection ? s.startSelection.map(s.changes.invertedDesc, 1) : t.selection);
    if (i && s.selectionsAfter.length)
      return t.update({
        selection: s.selectionsAfter[s.selectionsAfter.length - 1],
        annotations: wl.of({ side: e, rest: Mm(r), selection: l }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (s.changes) {
      let o = r.length == 1 ? Ee : r.slice(0, r.length - 1);
      return s.mapped && (o = bs(o, s.mapped)), t.update({
        changes: s.changes,
        selection: s.startSelection,
        effects: s.effects,
        annotations: wl.of({ side: e, rest: o, selection: l }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
rt.empty = /* @__PURE__ */ new rt(Ee, Ee);
const Em = [
  { key: "Mod-z", run: _f, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: $l, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: $l, preventDefault: !0 },
  { key: "Mod-u", run: Zm, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: Cm, preventDefault: !0 }
];
function vi(n, e) {
  return Q.create(n.ranges.map(e), n.mainIndex);
}
function Ie(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function Ge({ state: n, dispatch: e }, t) {
  let i = vi(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(Ie(n, i)), !0);
}
function Ur(n, e) {
  return Q.cursor(e ? n.to : n.from);
}
function Vf(n, e) {
  return Ge(n, (t) => t.empty ? n.moveByChar(t, e) : Ur(t, e));
}
function pe(n) {
  return n.textDirectionAt(n.state.selection.main.head) == te.LTR;
}
const qf = (n) => Vf(n, !pe(n)), Df = (n) => Vf(n, pe(n));
function If(n, e) {
  return Ge(n, (t) => t.empty ? n.moveByGroup(t, e) : Ur(t, e));
}
const Ym = (n) => If(n, !pe(n)), zm = (n) => If(n, pe(n));
function _m(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Fr(n, e, t) {
  let i = re(n).resolveInner(e.head), r = t ? R.closedBy : R.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    _m(n, h, r) ? i = h : a = t ? h.to : h.from;
  }
  let s = i.type.prop(r), l, o;
  return s && (l = t ? ni(n, i.from, 1) : ni(n, i.to, -1)) && l.matched ? o = t ? l.end.to : l.end.from : o = t ? i.to : i.from, Q.cursor(o, t ? -1 : 1);
}
const Wm = (n) => Ge(n, (e) => Fr(n.state, e, !pe(n))), Bm = (n) => Ge(n, (e) => Fr(n.state, e, pe(n)));
function Gf(n, e) {
  return Ge(n, (t) => {
    if (!t.empty)
      return Ur(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const Nf = (n) => Gf(n, !1), Uf = (n) => Gf(n, !0);
function Ff(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, r;
  if (e) {
    for (let s of n.state.facet(C.scrollMargins)) {
      let l = s(n);
      l != null && l.top && (t = Math.max(l == null ? void 0 : l.top, t)), l != null && l.bottom && (i = Math.max(l == null ? void 0 : l.bottom, i));
    }
    r = n.scrollDOM.clientHeight - t - i;
  } else
    r = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, r - 5)
  };
}
function Hf(n, e) {
  let t = Ff(n), { state: i } = n, r = vi(i.selection, (l) => l.empty ? n.moveVertically(l, e, t.height) : Ur(l, e));
  if (r.eq(i.selection))
    return !1;
  let s;
  if (t.selfScroll) {
    let l = n.coordsAtPos(i.selection.main.head), o = n.scrollDOM.getBoundingClientRect(), a = o.top + t.marginTop, h = o.bottom - t.marginBottom;
    l && l.top > a && l.bottom < h && (s = C.scrollIntoView(r.main.head, { y: "start", yMargin: l.top - a }));
  }
  return n.dispatch(Ie(i, r), { effects: s }), !0;
}
const Ia = (n) => Hf(n, !1), Pl = (n) => Hf(n, !0);
function Mt(n, e, t) {
  let i = n.lineBlockAt(e.head), r = n.moveToLineBoundary(e, t);
  if (r.head == e.head && r.head != (t ? i.to : i.from) && (r = n.moveToLineBoundary(e, t, !1)), !t && r.head == i.from && i.length) {
    let s = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    s && e.head != i.from + s && (r = Q.cursor(i.from + s));
  }
  return r;
}
const Vm = (n) => Ge(n, (e) => Mt(n, e, !0)), qm = (n) => Ge(n, (e) => Mt(n, e, !1)), Dm = (n) => Ge(n, (e) => Mt(n, e, !pe(n))), Im = (n) => Ge(n, (e) => Mt(n, e, pe(n))), Gm = (n) => Ge(n, (e) => Q.cursor(n.lineBlockAt(e.head).from, 1)), Nm = (n) => Ge(n, (e) => Q.cursor(n.lineBlockAt(e.head).to, -1));
function Um(n, e, t) {
  let i = !1, r = vi(n.selection, (s) => {
    let l = ni(n, s.head, -1) || ni(n, s.head, 1) || s.head > 0 && ni(n, s.head - 1, 1) || s.head < n.doc.length && ni(n, s.head + 1, -1);
    if (!l || !l.end)
      return s;
    i = !0;
    let o = l.start.from == s.head ? l.end.to : l.end.from;
    return Q.cursor(o);
  });
  return i ? (e(Ie(n, r)), !0) : !1;
}
const Fm = ({ state: n, dispatch: e }) => Um(n, e);
function Ye(n, e, t) {
  let i = vi(n.state.selection, (r) => {
    r.undirectional && r.head >= r.anchor != e && (r = Q.range(r.head, r.anchor));
    let s = t(r);
    return Q.range(r.anchor, s.head, s.goalColumn, s.bidiLevel || void 0, s.assoc);
  });
  return i.eq(n.state.selection) ? !1 : (n.dispatch(Ie(n.state, i)), !0);
}
function Kf(n, e) {
  return Ye(n, e, (t) => n.moveByChar(t, e));
}
const Jf = (n) => Kf(n, !pe(n)), eu = (n) => Kf(n, pe(n));
function tu(n, e) {
  return Ye(n, e, (t) => n.moveByGroup(t, e));
}
const Hm = (n) => tu(n, !pe(n)), Km = (n) => tu(n, pe(n)), Jm = (n) => {
  let e = !pe(n);
  return Ye(n, e, (t) => Fr(n.state, t, e));
}, e0 = (n) => {
  let e = pe(n);
  return Ye(n, e, (t) => Fr(n.state, t, e));
};
function iu(n, e) {
  return Ye(n, e, (t) => n.moveVertically(t, e));
}
const nu = (n) => iu(n, !1), ru = (n) => iu(n, !0);
function su(n, e) {
  return Ye(n, e, (t) => n.moveVertically(t, e, Ff(n).height));
}
const Ga = (n) => su(n, !1), Na = (n) => su(n, !0), t0 = (n) => Ye(n, !0, (e) => Mt(n, e, !0)), i0 = (n) => Ye(n, !1, (e) => Mt(n, e, !1)), n0 = (n) => {
  let e = !pe(n);
  return Ye(n, e, (t) => Mt(n, t, e));
}, r0 = (n) => {
  let e = pe(n);
  return Ye(n, e, (t) => Mt(n, t, e));
}, s0 = (n) => Ye(n, !1, (e) => Q.cursor(n.lineBlockAt(e.head).from)), l0 = (n) => Ye(n, !0, (e) => Q.cursor(n.lineBlockAt(e.head).to)), Ua = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: 0 })), !0), Fa = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.doc.length })), !0), Ha = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: 0 })), !0), Ka = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), o0 = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), a0 = ({ state: n, dispatch: e }) => {
  let t = Hr(n).map(({ from: i, to: r }) => Q.range(i, Math.min(r + 1, n.doc.length)));
  return e(n.update({ selection: Q.create(t), userEvent: "select" })), !0;
}, h0 = ({ state: n, dispatch: e }) => {
  let t = vi(n.selection, (i) => {
    let r = re(n), s = r.resolveStack(i.from, 1);
    if (i.empty) {
      let l = r.resolveStack(i.from, -1);
      l.node.from >= s.node.from && l.node.to <= s.node.to && (s = l);
    }
    for (let l = s; l; l = l.next) {
      let { node: o } = l;
      if ((o.from < i.from && o.to >= i.to || o.to > i.to && o.from <= i.from) && l.next)
        return Q.range(o.to, o.from);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(Ie(n, t)), !0);
};
function lu(n, e) {
  let { state: t } = n, i = t.selection, r = t.selection.ranges.slice();
  for (let s of t.selection.ranges) {
    let l = t.doc.lineAt(s.head);
    if (e ? l.to < n.state.doc.length : l.from > 0)
      for (let o = s; ; ) {
        let a = n.moveVertically(o, e);
        if (a.head < l.from || a.head > l.to) {
          r.some((h) => h.head == a.head) || r.push(a);
          break;
        } else {
          if (a.head == o.head)
            break;
          o = a;
        }
      }
  }
  return r.length == i.ranges.length ? !1 : (n.dispatch(Ie(t, Q.create(r, r.length - 1))), !0);
}
const c0 = (n) => lu(n, !1), f0 = (n) => lu(n, !0), u0 = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = Q.create([t.main]) : t.main.empty || (i = Q.create([Q.cursor(t.main.head)])), i ? (e(Ie(n, i)), !0) : !1;
};
function Tn(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, r = i.changeByRange((s) => {
    let { from: l, to: o } = s;
    if (l == o) {
      let a = e(s);
      a < l ? (t = "delete.backward", a = Un(n, a, !1)) : a > l && (t = "delete.forward", a = Un(n, a, !0)), l = Math.min(l, a), o = Math.max(o, a);
    } else
      l = Un(n, l, !1), o = Un(n, o, !0);
    return l == o ? { range: s } : { changes: { from: l, to: o }, range: Q.cursor(l, l < s.head ? -1 : 1) };
  });
  return r.changes.empty ? !1 : (n.dispatch(i.update(r, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? C.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Un(n, e, t) {
  if (n instanceof C)
    for (let i of n.state.facet(C.atomicRanges).map((r) => r(n)))
      i.between(e, e, (r, s) => {
        r < e && s > e && (e = t ? s : r);
      });
  return e;
}
const ou = (n, e, t) => Tn(n, (i) => {
  let r = i.from, { state: s } = n, l = s.doc.lineAt(r), o, a;
  if (t && !e && r > l.from && r < l.from + 200 && !/[^ \t]/.test(o = l.text.slice(0, r - l.from))) {
    if (o[o.length - 1] == "	")
      return r - 1;
    let h = gt(o, s.tabSize), c = h % Tr(s) || Tr(s);
    for (let f = 0; f < c && o[o.length - 1 - f] == " "; f++)
      r--;
    a = r;
  } else
    a = Oe(l.text, r - l.from, e, e) + l.from, a == r && l.number != (e ? s.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(l.text.slice(a - l.from, r - l.from)) && (a = Oe(l.text, a - l.from, !1, !1) + l.from);
  return a;
}), vl = (n) => ou(n, !1, !0), au = (n) => ou(n, !0, !1), hu = (n, e) => Tn(n, (t) => {
  let i = t.head, { state: r } = n, s = r.doc.lineAt(i), l = r.charCategorizer(i);
  for (let o = null; ; ) {
    if (i == (e ? s.to : s.from)) {
      i == t.head && s.number != (e ? r.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = Oe(s.text, i - s.from, e) + s.from, h = s.text.slice(Math.min(i, a) - s.from, Math.max(i, a) - s.from), c = l(h);
    if (o != null && c != o)
      break;
    (h != " " || i != t.head) && (o = c), i = a;
  }
  return i;
}), cu = (n) => hu(n, !1), O0 = (n) => hu(n, !0), d0 = (n) => Tn(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), p0 = (n) => Tn(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), g0 = (n) => Tn(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), m0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: j.of(["", ""]) },
    range: Q.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, S0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let r = i.from, s = n.doc.lineAt(r), l = r == s.from ? r - 1 : Oe(s.text, r - s.from, !1) + s.from, o = r == s.to ? r + 1 : Oe(s.text, r - s.from, !0) + s.from;
    return {
      changes: { from: l, to: o, insert: n.doc.slice(r, o).append(n.doc.slice(l, r)) },
      range: Q.cursor(o)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Hr(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let r = n.doc.lineAt(i.from), s = n.doc.lineAt(i.to);
    if (!i.empty && i.to == s.from && (s = n.doc.lineAt(i.to - 1)), t >= r.number) {
      let l = e[e.length - 1];
      l.to = s.to, l.ranges.push(i);
    } else
      e.push({ from: r.from, to: s.to, ranges: [i] });
    t = s.number + 1;
  }
  return e;
}
function fu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], r = [];
  for (let s of Hr(n)) {
    if (t ? s.to == n.doc.length : s.from == 0)
      continue;
    let l = n.doc.lineAt(t ? s.to + 1 : s.from - 1), o = l.length + 1;
    if (t) {
      i.push({ from: s.to, to: l.to }, { from: s.from, insert: l.text + n.lineBreak });
      for (let a of s.ranges)
        r.push(Q.range(Math.min(n.doc.length, a.anchor + o), Math.min(n.doc.length, a.head + o)));
    } else {
      i.push({ from: l.from, to: s.from }, { from: s.to, insert: n.lineBreak + l.text });
      for (let a of s.ranges)
        r.push(Q.range(a.anchor - o, a.head - o));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: Q.create(r, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const Q0 = ({ state: n, dispatch: e }) => fu(n, e, !1), b0 = ({ state: n, dispatch: e }) => fu(n, e, !0);
function uu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let s of Hr(n))
    t ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
  let r = n.changes(i);
  return e(n.update({
    changes: r,
    selection: n.selection.map(r, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const y0 = ({ state: n, dispatch: e }) => uu(n, e, !1), k0 = ({ state: n, dispatch: e }) => uu(n, e, !0), x0 = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(Hr(e).map(({ from: r, to: s }) => (r > 0 ? r-- : s < e.doc.length && s++, { from: r, to: s }))), i = vi(e.selection, (r) => {
    let s;
    if (n.lineWrapping) {
      let l = n.lineBlockAt(r.head), o = n.coordsAtPos(r.head, r.assoc || 1);
      o && (s = l.bottom + n.documentTop - o.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(r, !0, s);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function w0(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = re(n).resolveInner(e), i = t.childBefore(e), r = t.childAfter(e), s;
  return i && r && i.to <= e && r.from >= e && (s = i.type.prop(R.closedBy)) && s.indexOf(r.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(r.from).from && !/\S/.test(n.sliceDoc(i.to, r.from)) ? { from: i.to, to: r.from } : null;
}
const Ja = /* @__PURE__ */ Ou(!1), $0 = /* @__PURE__ */ Ou(!0);
function Ou(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((r) => {
      let { from: s, to: l } = r, o = e.doc.lineAt(s), a = !n && s == l && w0(e, s);
      n && (s = l = (l <= o.to ? o : e.doc.lineAt(l)).to);
      let h = new Gr(e, { simulateBreak: s, simulateDoubleBreak: !!a }), c = Xf(h, s);
      for (c == null && (c = gt(/^\s*/.exec(e.doc.lineAt(s).text)[0], e.tabSize)); l < o.to && /\s/.test(o.text[l - o.from]); )
        l++;
      a ? { from: s, to: l } = a : s > o.from && s < o.from + 100 && !/\S/.test(o.text.slice(0, s)) && (s = o.from);
      let f = ["", Zr(e, c)];
      return a && f.push(Zr(e, h.lineIndent(o.from, -1))), {
        changes: { from: s, to: l, insert: j.of(f) },
        range: Q.cursor(s + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function co(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let r = [];
    for (let l = i.from; l <= i.to; ) {
      let o = n.doc.lineAt(l);
      o.number > t && (i.empty || i.to > o.from) && (e(o, r, i), t = o.number), l = o.to + 1;
    }
    let s = n.changes(r);
    return {
      changes: r,
      range: Q.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
    };
  });
}
const P0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new Gr(n, { overrideIndentation: (s) => {
    let l = t[s];
    return l ?? -1;
  } }), r = co(n, (s, l, o) => {
    let a = Xf(i, s.from);
    if (a == null)
      return;
    /\S/.test(s.text) || (a = 0);
    let h = /^\s*/.exec(s.text)[0], c = Zr(n, a);
    (h != c || o.from < s.from + h.length) && (t[s.from] = a, l.push({ from: s.from, to: s.from + h.length, insert: c }));
  });
  return r.changes.empty || e(n.update(r, { userEvent: "indent" })), !0;
}, v0 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(co(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet($n) });
}), { userEvent: "input.indent" })), !0), T0 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(co(n, (t, i) => {
  let r = /^\s*/.exec(t.text)[0];
  if (!r)
    return;
  let s = gt(r, n.tabSize), l = 0, o = Zr(n, Math.max(0, s - Tr(n)));
  for (; l < r.length && l < o.length && r.charCodeAt(l) == o.charCodeAt(l); )
    l++;
  i.push({ from: t.from + l, to: t.from + r.length, insert: o.slice(l) });
}), { userEvent: "delete.dedent" })), !0), Z0 = (n) => (n.setTabFocusMode(), !0), C0 = [
  { key: "Ctrl-b", run: qf, shift: Jf, preventDefault: !0 },
  { key: "Ctrl-f", run: Df, shift: eu },
  { key: "Ctrl-p", run: Nf, shift: nu },
  { key: "Ctrl-n", run: Uf, shift: ru },
  { key: "Ctrl-a", run: Gm, shift: s0 },
  { key: "Ctrl-e", run: Nm, shift: l0 },
  { key: "Ctrl-d", run: au },
  { key: "Ctrl-h", run: vl },
  { key: "Ctrl-k", run: d0 },
  { key: "Ctrl-Alt-h", run: cu },
  { key: "Ctrl-o", run: m0 },
  { key: "Ctrl-t", run: S0 },
  { key: "Ctrl-v", run: Pl }
], A0 = /* @__PURE__ */ [
  { key: "ArrowLeft", run: qf, shift: Jf, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Ym, shift: Hm, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Dm, shift: n0, preventDefault: !0 },
  { key: "ArrowRight", run: Df, shift: eu, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: zm, shift: Km, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: Im, shift: r0, preventDefault: !0 },
  { key: "ArrowUp", run: Nf, shift: nu, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Ua, shift: Ha },
  { mac: "Ctrl-ArrowUp", run: Ia, shift: Ga },
  { key: "ArrowDown", run: Uf, shift: ru, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Fa, shift: Ka },
  { mac: "Ctrl-ArrowDown", run: Pl, shift: Na },
  { key: "PageUp", run: Ia, shift: Ga },
  { key: "PageDown", run: Pl, shift: Na },
  { key: "Home", run: qm, shift: i0, preventDefault: !0 },
  { key: "Mod-Home", run: Ua, shift: Ha },
  { key: "End", run: Vm, shift: t0, preventDefault: !0 },
  { key: "Mod-End", run: Fa, shift: Ka },
  { key: "Enter", run: Ja, shift: Ja },
  { key: "Mod-a", run: o0 },
  { key: "Backspace", run: vl, shift: vl, preventDefault: !0 },
  { key: "Delete", run: au, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: cu, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: O0, preventDefault: !0 },
  { mac: "Mod-Backspace", run: p0, preventDefault: !0 },
  { mac: "Mod-Delete", run: g0, preventDefault: !0 }
].concat(/* @__PURE__ */ C0.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), X0 = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Wm, shift: Jm },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Bm, shift: e0 },
  { key: "Alt-ArrowUp", run: Q0 },
  { key: "Shift-Alt-ArrowUp", run: y0 },
  { key: "Alt-ArrowDown", run: b0 },
  { key: "Shift-Alt-ArrowDown", run: k0 },
  { key: "Mod-Alt-ArrowUp", run: c0 },
  { key: "Mod-Alt-ArrowDown", run: f0 },
  { key: "Escape", run: u0 },
  { key: "Mod-Enter", run: $0 },
  { key: "Alt-l", mac: "Ctrl-l", run: a0 },
  { key: "Mod-i", run: h0, preventDefault: !0 },
  { key: "Mod-[", run: T0 },
  { key: "Mod-]", run: v0 },
  { key: "Mod-Alt-\\", run: P0 },
  { key: "Shift-Mod-k", run: x0 },
  { key: "Shift-Mod-\\", run: Fm },
  { key: "Mod-/", run: Qm },
  { key: "Alt-A", run: ym },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: Z0 }
].concat(A0);
class R0 {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, r) {
    this.state = e, this.pos = t, this.explicit = i, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = re(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), r = t.text.slice(i - t.from, this.pos - t.from), s = r.search(E0(e));
    return s < 0 ? null : { from: i + s, to: this.pos, text: r.slice(s) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function eh(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function M0(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: r } of n) {
    e[r[0]] = !0;
    for (let s = 1; s < r.length; s++)
      t[r[s]] = !0;
  }
  let i = eh(e) + eh(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function L0(n) {
  let e = n.map((r) => typeof r == "string" ? { label: r } : r), [t, i] = e.every((r) => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : M0(e);
  return (r) => {
    let s = r.matchBefore(i);
    return s || r.explicit ? { from: s ? s.from : r.pos, options: e, validFor: t } : null;
  };
}
function j0(n, e) {
  return (t) => {
    for (let i = re(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return e(t);
  };
}
function E0(n, e) {
  var t;
  let { source: i } = n, r = i[i.length - 1] != "$";
  return r ? new RegExp(`(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "") : n;
}
const Y0 = /* @__PURE__ */ Qt.define(), z0 = /* @__PURE__ */ C.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center",
    cursor: "pointer"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class _0 {
  constructor(e, t, i, r) {
    this.field = e, this.line = t, this.from = i, this.to = r;
  }
}
class fo {
  constructor(e, t, i) {
    this.field = e, this.from = t, this.to = i;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, me.TrackDel), i = e.mapPos(this.to, 1, me.TrackDel);
    return t == null || i == null ? null : new fo(this.field, t, i);
  }
}
class uo {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let i = [], r = [t], s = e.doc.lineAt(t), l = /^\s*/.exec(s.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let h = l, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet($n);
        r.push(t + h.length - c), a = h + a.slice(c);
      }
      i.push(a), t += a.length + 1;
    }
    let o = this.fieldPositions.map((a) => new fo(a.field, r[a.line] + a.from, r[a.line] + a.to));
    return { text: i, ranges: o };
  }
  static parse(e) {
    let t = [], i = [], r = [], s;
    for (let l of e.split(/\r\n?|\n/)) {
      for (; s = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(l); ) {
        let o = s[1] ? +s[1] : null, a = s[2] || s[3] || "", h = -1;
        o === 0 && (o = 1e9);
        let c = a.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < t.length; f++)
          (o != null ? t[f].seq == o : c && t[f].name == c) && (h = f);
        if (h < 0) {
          let f = 0;
          for (; f < t.length && (o == null || t[f].seq != null && t[f].seq < o); )
            f++;
          t.splice(f, 0, { seq: o, name: c }), h = f;
          for (let u of r)
            u.field >= h && u.field++;
        }
        for (let f of r)
          if (f.line == i.length && f.from > s.index) {
            let u = s[2] ? 3 + (s[1] || "").length : 2;
            f.from -= u, f.to -= u;
          }
        r.push(new _0(h, i.length, s.index, s.index + c.length)), l = l.slice(0, s.index) + a + l.slice(s.index + s[0].length);
      }
      l = l.replace(/\\([{}])/g, (o, a, h) => {
        for (let c of r)
          c.line == i.length && c.from > h && (c.from--, c.to--);
        return a;
      }), i.push(l);
    }
    return new uo(i, r);
  }
}
let W0 = /* @__PURE__ */ V.widget({ widget: /* @__PURE__ */ new class extends Rt {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), B0 = /* @__PURE__ */ V.mark({ class: "cm-snippetField" });
class Ti {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = V.set(e.map((i) => (i.from == i.to ? W0 : B0).range(i.from, i.to)), !0);
  }
  map(e) {
    let t = [];
    for (let i of this.ranges) {
      let r = i.map(e);
      if (!r)
        return null;
      t.push(r);
    }
    return new Ti(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
  }
}
const Zn = /* @__PURE__ */ I.define({
  map(n, e) {
    return n && n.map(e);
  }
}), V0 = /* @__PURE__ */ I.define(), On = /* @__PURE__ */ Ae.define({
  create() {
    return null;
  },
  update(n, e) {
    for (let t of e.effects) {
      if (t.is(Zn))
        return t.value;
      if (t.is(V0) && n)
        return new Ti(n.ranges, t.value);
    }
    return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
  },
  provide: (n) => C.decorations.from(n, (e) => e ? e.deco : V.none)
});
function Oo(n, e) {
  return Q.create(n.filter((t) => t.field == e).map((t) => Q.range(t.from, t.to)));
}
function q0(n) {
  let e = uo.parse(n);
  return (t, i, r, s) => {
    let { text: l, ranges: o } = e.instantiate(t.state, r), { main: a } = t.state.selection, h = {
      changes: { from: r, to: s == a.from ? a.to : s, insert: j.of(l) },
      scrollIntoView: !0,
      annotations: i ? [Y0.of(i), ee.userEvent.of("input.complete")] : void 0
    };
    if (o.length && (h.selection = Oo(o, 0)), o.some((c) => c.field > 0)) {
      let c = new Ti(o, 0), f = h.effects = [Zn.of(c)];
      t.state.field(On, !1) === void 0 && f.push(I.appendConfig.of([On, U0, F0, z0]));
    }
    t.dispatch(t.state.update(h));
  };
}
function du(n) {
  return ({ state: e, dispatch: t }) => {
    let i = e.field(On, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let r = i.active + n, s = n > 0 && !i.ranges.some((l) => l.field == r + n);
    return t(e.update({
      selection: Oo(i.ranges, r),
      effects: Zn.of(s ? null : new Ti(i.ranges, r)),
      scrollIntoView: !0
    })), !0;
  };
}
const D0 = ({ state: n, dispatch: e }) => n.field(On, !1) ? (e(n.update({ effects: Zn.of(null) })), !0) : !1, I0 = /* @__PURE__ */ du(1), G0 = /* @__PURE__ */ du(-1), N0 = [
  { key: "Tab", run: I0, shift: G0 },
  { key: "Escape", run: D0 }
], th = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? n[0] : N0;
  }
}), U0 = /* @__PURE__ */ $i.highest(/* @__PURE__ */ Ir.compute([th], (n) => n.facet(th)));
function ye(n, e) {
  return { ...e, apply: q0(n) };
}
const F0 = /* @__PURE__ */ C.domEventHandlers({
  mousedown(n, e) {
    let t = e.state.field(On, !1), i;
    if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let r = t.ranges.find((s) => s.from <= i && s.to >= i);
    return !r || r.field == t.active ? !1 : (e.dispatch({
      selection: Oo(t.ranges, r.field),
      effects: Zn.of(t.ranges.some((s) => s.field > r.field) ? new Ti(t.ranges, r.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), pu = /* @__PURE__ */ new class extends vt {
}();
pu.startSide = 1;
pu.endSide = -1;
class Ar {
  static create(e, t, i, r, s) {
    let l = r + (r << 8) + e + (t << 4) | 0;
    return new Ar(e, t, i, l, s, [], []);
  }
  constructor(e, t, i, r, s, l, o) {
    this.type = e, this.value = t, this.from = i, this.hash = r, this.end = s, this.children = l, this.positions = o, this.hashProp = [[R.contextHash, r]];
  }
  addChild(e, t) {
    e.prop(R.contextHash) != this.hash && (e = new _(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t);
  }
  toTree(e, t = this.end) {
    let i = this.children.length - 1;
    return i >= 0 && (t = Math.max(t, this.positions[i] + this.children[i].length + this.from)), new _(e.types[this.type], this.children, this.positions, t - this.from).balance({
      makeTree: (r, s, l) => new _(le.none, r, s, l, this.hashProp)
    });
  }
}
var k;
(function(n) {
  n[n.Document = 1] = "Document", n[n.CodeBlock = 2] = "CodeBlock", n[n.FencedCode = 3] = "FencedCode", n[n.Blockquote = 4] = "Blockquote", n[n.HorizontalRule = 5] = "HorizontalRule", n[n.BulletList = 6] = "BulletList", n[n.OrderedList = 7] = "OrderedList", n[n.ListItem = 8] = "ListItem", n[n.ATXHeading1 = 9] = "ATXHeading1", n[n.ATXHeading2 = 10] = "ATXHeading2", n[n.ATXHeading3 = 11] = "ATXHeading3", n[n.ATXHeading4 = 12] = "ATXHeading4", n[n.ATXHeading5 = 13] = "ATXHeading5", n[n.ATXHeading6 = 14] = "ATXHeading6", n[n.SetextHeading1 = 15] = "SetextHeading1", n[n.SetextHeading2 = 16] = "SetextHeading2", n[n.HTMLBlock = 17] = "HTMLBlock", n[n.LinkReference = 18] = "LinkReference", n[n.Paragraph = 19] = "Paragraph", n[n.CommentBlock = 20] = "CommentBlock", n[n.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", n[n.Escape = 22] = "Escape", n[n.Entity = 23] = "Entity", n[n.HardBreak = 24] = "HardBreak", n[n.Emphasis = 25] = "Emphasis", n[n.StrongEmphasis = 26] = "StrongEmphasis", n[n.Link = 27] = "Link", n[n.Image = 28] = "Image", n[n.InlineCode = 29] = "InlineCode", n[n.HTMLTag = 30] = "HTMLTag", n[n.Comment = 31] = "Comment", n[n.ProcessingInstruction = 32] = "ProcessingInstruction", n[n.Autolink = 33] = "Autolink", n[n.HeaderMark = 34] = "HeaderMark", n[n.QuoteMark = 35] = "QuoteMark", n[n.ListMark = 36] = "ListMark", n[n.LinkMark = 37] = "LinkMark", n[n.EmphasisMark = 38] = "EmphasisMark", n[n.CodeMark = 39] = "CodeMark", n[n.CodeText = 40] = "CodeText", n[n.CodeInfo = 41] = "CodeInfo", n[n.LinkTitle = 42] = "LinkTitle", n[n.LinkLabel = 43] = "LinkLabel", n[n.URL = 44] = "URL";
})(k || (k = {}));
class H0 {
  /**
  @internal
  */
  constructor(e, t) {
    this.start = e, this.content = t, this.marks = [], this.parsers = [];
  }
}
class K0 {
  constructor() {
    this.text = "", this.baseIndent = 0, this.basePos = 0, this.depth = 0, this.markers = [], this.pos = 0, this.indent = 0, this.next = -1;
  }
  /**
  @internal
  */
  forward() {
    this.basePos > this.pos && this.forwardInner();
  }
  /**
  @internal
  */
  forwardInner() {
    let e = this.skipSpace(this.basePos);
    this.indent = this.countIndent(e, this.pos, this.indent), this.pos = e, this.next = e == this.text.length ? -1 : this.text.charCodeAt(e);
  }
  /**
  Skip whitespace after the given position, return the position of
  the next non-space character or the end of the line if there's
  only space after `from`.
  */
  skipSpace(e) {
    return en(this.text, e);
  }
  /**
  @internal
  */
  reset(e) {
    for (this.text = e, this.baseIndent = this.basePos = this.pos = this.indent = 0, this.forwardInner(), this.depth = 1; this.markers.length; )
      this.markers.pop();
  }
  /**
  Move the line's base position forward to the given position.
  This should only be called by composite [block
  parsers](#BlockParser.parse) or [markup skipping
  functions](#NodeSpec.composite).
  */
  moveBase(e) {
    this.basePos = e, this.baseIndent = this.countIndent(e, this.pos, this.indent);
  }
  /**
  Move the line's base position forward to the given _column_.
  */
  moveBaseColumn(e) {
    this.baseIndent = e, this.basePos = this.findColumn(e);
  }
  /**
  Store a composite-block-level marker. Should be called from
  [markup skipping functions](#NodeSpec.composite) when they
  consume any non-whitespace characters.
  */
  addMarker(e) {
    this.markers.push(e);
  }
  /**
  Find the column position at `to`, optionally starting at a given
  position and column.
  */
  countIndent(e, t = 0, i = 0) {
    for (let r = t; r < e; r++)
      i += this.text.charCodeAt(r) == 9 ? 4 - i % 4 : 1;
    return i;
  }
  /**
  Find the position corresponding to the given column.
  */
  findColumn(e) {
    let t = 0;
    for (let i = 0; t < this.text.length && i < e; t++)
      i += this.text.charCodeAt(t) == 9 ? 4 - i % 4 : 1;
    return t;
  }
  /**
  @internal
  */
  scrub() {
    if (!this.baseIndent)
      return this.text;
    let e = "";
    for (let t = 0; t < this.basePos; t++)
      e += " ";
    return e + this.text.slice(this.basePos);
  }
}
function ih(n, e, t) {
  if (t.pos == t.text.length || n != e.block && t.indent >= e.stack[t.depth + 1].value + t.baseIndent)
    return !0;
  if (t.indent >= t.baseIndent + 4)
    return !1;
  let i = (n.type == k.OrderedList ? mo : go)(t, e, !1);
  return i > 0 && (n.type != k.BulletList || po(t, e, !1) < 0) && t.text.charCodeAt(t.pos + i - 1) == n.value;
}
const gu = {
  [k.Blockquote](n, e, t) {
    return t.next != 62 ? !1 : (t.markers.push(Y(k.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1)), t.moveBase(t.pos + (ze(t.text.charCodeAt(t.pos + 1)) ? 2 : 1)), n.end = e.lineStart + t.text.length, !0);
  },
  [k.ListItem](n, e, t) {
    return t.indent < t.baseIndent + n.value && t.next > -1 ? !1 : (t.moveBaseColumn(t.baseIndent + n.value), !0);
  },
  [k.OrderedList]: ih,
  [k.BulletList]: ih,
  [k.Document]() {
    return !0;
  }
};
function ze(n) {
  return n == 32 || n == 9 || n == 10 || n == 13;
}
function en(n, e = 0) {
  for (; e < n.length && ze(n.charCodeAt(e)); )
    e++;
  return e;
}
function nh(n, e, t) {
  for (; e > t && ze(n.charCodeAt(e - 1)); )
    e--;
  return e;
}
function mu(n) {
  if (n.next != 96 && n.next != 126)
    return -1;
  let e = n.pos + 1;
  for (; e < n.text.length && n.text.charCodeAt(e) == n.next; )
    e++;
  if (e < n.pos + 3)
    return -1;
  if (n.next == 96) {
    for (let t = e; t < n.text.length; t++)
      if (n.text.charCodeAt(t) == 96)
        return -1;
  }
  return e;
}
function Su(n) {
  return n.next != 62 ? -1 : n.text.charCodeAt(n.pos + 1) == 32 ? 2 : 1;
}
function po(n, e, t) {
  if (n.next != 42 && n.next != 45 && n.next != 95)
    return -1;
  let i = 1;
  for (let r = n.pos + 1; r < n.text.length; r++) {
    let s = n.text.charCodeAt(r);
    if (s == n.next)
      i++;
    else if (!ze(s))
      return -1;
  }
  return t && n.next == 45 && yu(n) > -1 && n.depth == e.stack.length && e.parser.leafBlockParsers.indexOf($u.SetextHeading) > -1 || i < 3 ? -1 : 1;
}
function Qu(n, e) {
  for (let t = n.stack.length - 1; t >= 0; t--)
    if (n.stack[t].type == e)
      return !0;
  return !1;
}
function go(n, e, t) {
  return (n.next == 45 || n.next == 43 || n.next == 42) && (n.pos == n.text.length - 1 || ze(n.text.charCodeAt(n.pos + 1))) && (!t || Qu(e, k.BulletList) || n.skipSpace(n.pos + 2) < n.text.length) ? 1 : -1;
}
function mo(n, e, t) {
  let i = n.pos, r = n.next;
  for (; r >= 48 && r <= 57; ) {
    i++;
    if (i == n.text.length)
      return -1;
    r = n.text.charCodeAt(i);
  }
  return i == n.pos || i > n.pos + 9 || r != 46 && r != 41 || i < n.text.length - 1 && !ze(n.text.charCodeAt(i + 1)) || t && !Qu(e, k.OrderedList) && (n.skipSpace(i + 1) == n.text.length || i > n.pos + 1 || n.next != 49) ? -1 : i + 1 - n.pos;
}
function bu(n) {
  if (n.next != 35)
    return -1;
  let e = n.pos + 1;
  for (; e < n.text.length && n.text.charCodeAt(e) == 35; )
    e++;
  if (e < n.text.length && n.text.charCodeAt(e) != 32)
    return -1;
  let t = e - n.pos;
  return t > 6 ? -1 : t;
}
function yu(n) {
  if (n.next != 45 && n.next != 61 || n.indent >= n.baseIndent + 4)
    return -1;
  let e = n.pos + 1;
  for (; e < n.text.length && n.text.charCodeAt(e) == n.next; )
    e++;
  let t = e;
  for (; e < n.text.length && ze(n.text.charCodeAt(e)); )
    e++;
  return e == n.text.length ? t : -1;
}
const Tl = /^[ \t]*$/, ku = /-->/, xu = /\?>/, Zl = [
  [/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
  [/^\s*<!--/, ku],
  [/^\s*<\?/, xu],
  [/^\s*<![A-Z]/, />/],
  [/^\s*<!\[CDATA\[/, /\]\]>/],
  [/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, Tl],
  [/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, Tl]
];
function wu(n, e, t) {
  if (n.next != 60)
    return -1;
  let i = n.text.slice(n.pos);
  for (let r = 0, s = Zl.length - (t ? 1 : 0); r < s; r++)
    if (Zl[r][0].test(i))
      return r;
  return -1;
}
function rh(n, e) {
  let t = n.countIndent(e, n.pos, n.indent), i = n.skipSpace(e), r = n.countIndent(i, e, t);
  return r >= t + 5 || i == n.text.length ? t + 1 : r;
}
function yt(n, e, t) {
  let i = n.length - 1;
  i >= 0 && n[i].to == e && n[i].type == k.CodeText ? n[i].to = t : n.push(Y(k.CodeText, e, t));
}
const Fn = {
  LinkReference: void 0,
  IndentedCode(n, e) {
    let t = e.baseIndent + 4;
    if (e.indent < t)
      return !1;
    let i = e.findColumn(t), r = n.lineStart + i, s = n.lineStart + e.text.length, l = [], o = [];
    for (yt(l, r, s); n.nextLine() && e.depth >= n.stack.length; )
      if (e.pos == e.text.length) {
        yt(o, n.lineStart - 1, n.lineStart);
        for (let a of e.markers)
          o.push(a);
      } else {
        if (e.indent < t)
          break;
        {
          if (o.length) {
            for (let h of o)
              h.type == k.CodeText ? yt(l, h.from, h.to) : l.push(h);
            o = [];
          }
          yt(l, n.lineStart - 1, n.lineStart);
          for (let h of e.markers)
            l.push(h);
          s = n.lineStart + e.text.length;
          let a = n.lineStart + e.findColumn(e.baseIndent + 4);
          a < s && yt(l, a, s);
        }
      }
    return o.length && (o = o.filter((a) => a.type != k.CodeText), o.length && (e.markers = o.concat(e.markers))), n.addNode(n.buffer.writeElements(l, -r).finish(k.CodeBlock, s - r), r), !0;
  },
  FencedCode(n, e) {
    let t = mu(e);
    if (t < 0)
      return !1;
    let i = n.lineStart + e.pos, r = e.next, s = t - e.pos, l = e.skipSpace(t), o = nh(e.text, e.text.length, l), a = [Y(k.CodeMark, i, i + s)];
    l < o && a.push(Y(k.CodeInfo, n.lineStart + l, n.lineStart + o));
    for (let h = !0, c = !0, f = !1; n.nextLine() && e.depth >= n.stack.length; h = !1) {
      let u = e.pos;
      if (e.indent - e.baseIndent < 4)
        for (; u < e.text.length && e.text.charCodeAt(u) == r; )
          u++;
      if (u - e.pos >= s && e.skipSpace(u) == e.text.length) {
        for (let O of e.markers)
          a.push(O);
        c && f && yt(a, n.lineStart - 1, n.lineStart), a.push(Y(k.CodeMark, n.lineStart + e.pos, n.lineStart + u)), n.nextLine();
        break;
      } else {
        f = !0, h || (yt(a, n.lineStart - 1, n.lineStart), c = !1);
        for (let p of e.markers)
          a.push(p);
        let O = n.lineStart + e.basePos, d = n.lineStart + e.text.length;
        O < d && (yt(a, O, d), c = !1);
      }
    }
    return n.addNode(n.buffer.writeElements(a, -i).finish(k.FencedCode, n.prevLineEnd() - i), i), !0;
  },
  Blockquote(n, e) {
    let t = Su(e);
    return t < 0 ? !1 : (n.startContext(k.Blockquote, e.pos), n.addNode(k.QuoteMark, n.lineStart + e.pos, n.lineStart + e.pos + 1), e.moveBase(e.pos + t), null);
  },
  HorizontalRule(n, e) {
    if (po(e, n, !1) < 0)
      return !1;
    let t = n.lineStart + e.pos;
    return n.nextLine(), n.addNode(k.HorizontalRule, t), !0;
  },
  BulletList(n, e) {
    let t = go(e, n, !1);
    if (t < 0)
      return !1;
    n.block.type != k.BulletList && n.startContext(k.BulletList, e.basePos, e.next);
    let i = rh(e, e.pos + 1);
    return n.startContext(k.ListItem, e.basePos, i - e.baseIndent), n.addNode(k.ListMark, n.lineStart + e.pos, n.lineStart + e.pos + t), e.moveBaseColumn(i), null;
  },
  OrderedList(n, e) {
    let t = mo(e, n, !1);
    if (t < 0)
      return !1;
    n.block.type != k.OrderedList && n.startContext(k.OrderedList, e.basePos, e.text.charCodeAt(e.pos + t - 1));
    let i = rh(e, e.pos + t);
    return n.startContext(k.ListItem, e.basePos, i - e.baseIndent), n.addNode(k.ListMark, n.lineStart + e.pos, n.lineStart + e.pos + t), e.moveBaseColumn(i), null;
  },
  ATXHeading(n, e) {
    let t = bu(e);
    if (t < 0)
      return !1;
    let i = e.pos, r = n.lineStart + i, s = nh(e.text, e.text.length, i), l = s;
    for (; l > i && e.text.charCodeAt(l - 1) == e.next; )
      l--;
    (l == s || l == i || !ze(e.text.charCodeAt(l - 1))) && (l = e.text.length);
    let o = n.buffer.write(k.HeaderMark, 0, t).writeElements(n.parser.parseInline(e.text.slice(i + t + 1, l), r + t + 1), -r);
    l < e.text.length && o.write(k.HeaderMark, l - i, s - i);
    let a = o.finish(k.ATXHeading1 - 1 + t, e.text.length - i);
    return n.nextLine(), n.addNode(a, r), !0;
  },
  HTMLBlock(n, e) {
    let t = wu(e, n, !1);
    if (t < 0)
      return !1;
    let i = n.lineStart + e.pos, r = Zl[t][1], s = [], l = r != Tl;
    for (; !r.test(e.text) && n.nextLine(); ) {
      if (e.depth < n.stack.length) {
        l = !1;
        break;
      }
      for (let h of e.markers)
        s.push(h);
    }
    l && n.nextLine();
    let o = r == ku ? k.CommentBlock : r == xu ? k.ProcessingInstructionBlock : k.HTMLBlock, a = n.prevLineEnd();
    return n.addNode(n.buffer.writeElements(s, -i).finish(o, a - i), i), !0;
  },
  SetextHeading: void 0
  // Specifies relative precedence for block-continue function
};
class J0 {
  constructor(e) {
    this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content);
  }
  nextLine(e, t, i) {
    if (this.stage == -1)
      return !1;
    let r = i.content + `
` + t.scrub(), s = this.advance(r);
    return s > -1 && s < r.length ? this.complete(e, i, s) : !1;
  }
  finish(e, t) {
    return (this.stage == 2 || this.stage == 3) && en(t.content, this.pos) == t.content.length ? this.complete(e, t, t.content.length) : !1;
  }
  complete(e, t, i) {
    return e.addLeafElement(t, Y(k.LinkReference, this.start, this.start + i, this.elts)), !0;
  }
  nextStage(e) {
    return e ? (this.pos = e.to - this.start, this.elts.push(e), this.stage++, !0) : (e === !1 && (this.stage = -1), !1);
  }
  advance(e) {
    for (; ; ) {
      if (this.stage == -1)
        return -1;
      if (this.stage == 0) {
        if (!this.nextStage(Mu(e, this.pos, this.start, !0)))
          return -1;
        if (e.charCodeAt(this.pos) != 58)
          return this.stage = -1;
        this.elts.push(Y(k.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++;
      } else if (this.stage == 1) {
        if (!this.nextStage(Xu(e, en(e, this.pos), this.start)))
          return -1;
      } else if (this.stage == 2) {
        let t = en(e, this.pos), i = 0;
        if (t > this.pos) {
          let r = Ru(e, t, this.start);
          if (r) {
            let s = ys(e, r.to - this.start);
            s > 0 && (this.nextStage(r), i = s);
          }
        }
        return i || (i = ys(e, this.pos)), i > 0 && i < e.length ? i : -1;
      } else
        return ys(e, this.pos);
    }
  }
}
function ys(n, e) {
  for (; e < n.length; e++) {
    let t = n.charCodeAt(e);
    if (t == 10)
      break;
    if (!ze(t))
      return -1;
  }
  return e;
}
class e1 {
  nextLine(e, t, i) {
    let r = t.depth < e.stack.length ? -1 : yu(t), s = t.next;
    if (r < 0)
      return !1;
    let l = Y(k.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
    return e.nextLine(), e.addLeafElement(i, Y(s == 61 ? k.SetextHeading1 : k.SetextHeading2, i.start, e.prevLineEnd(), [
      ...e.parser.parseInline(i.content, i.start),
      l
    ])), !0;
  }
  finish() {
    return !1;
  }
}
const $u = {
  LinkReference(n, e) {
    return e.content.charCodeAt(0) == 91 ? new J0(e) : null;
  },
  SetextHeading() {
    return new e1();
  }
}, t1 = [
  (n, e) => bu(e) >= 0,
  (n, e) => mu(e) >= 0,
  (n, e) => Su(e) >= 0,
  (n, e) => go(e, n, !0) >= 0,
  (n, e) => mo(e, n, !0) >= 0,
  (n, e) => po(e, n, !0) >= 0,
  (n, e) => wu(e, n, !0) >= 0
], i1 = { text: "", end: 0 };
class n1 {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.parser = e, this.input = t, this.ranges = r, this.line = new K0(), this.atEnd = !1, this.reusePlaceholders = /* @__PURE__ */ new Map(), this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = Ar.create(k.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = i.length ? new l1(i, t) : null, this.readLine();
  }
  get parsedPos() {
    return this.absoluteLineStart;
  }
  advance() {
    if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt)
      return this.finish();
    let { line: e } = this;
    for (; ; ) {
      for (let i = 0; ; ) {
        let r = e.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
        for (; i < e.markers.length && (!r || e.markers[i].from < r.end); ) {
          let s = e.markers[i++];
          this.addNode(s.type, s.from, s.to);
        }
        if (!r)
          break;
        this.finishContext();
      }
      if (e.pos < e.text.length)
        break;
      if (!this.nextLine())
        return this.finish();
    }
    if (this.fragments && this.reuseFragment(e.basePos))
      return null;
    e: for (; ; ) {
      for (let i of this.parser.blockParsers)
        if (i) {
          let r = i(this, e);
          if (r != !1) {
            if (r == !0)
              return null;
            e.forward();
            continue e;
          }
        }
      break;
    }
    if (e.pos == e.text.length)
      return this.nextLine() ? null : this.finish();
    let t = new H0(this.lineStart + e.pos, e.text.slice(e.pos));
    for (let i of this.parser.leafBlockParsers)
      if (i) {
        let r = i(this, t);
        r && t.parsers.push(r);
      }
    e: for (; this.nextLine() && e.pos != e.text.length; ) {
      if (e.indent < e.baseIndent + 4) {
        for (let i of this.parser.endLeafBlock)
          if (i(this, e, t))
            break e;
      }
      for (let i of t.parsers)
        if (i.nextLine(this, e, t))
          return null;
      t.content += `
` + e.scrub();
      for (let i of e.markers)
        t.marks.push(i);
    }
    return this.finishLeaf(t), null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  reuseFragment(e) {
    if (!this.fragments.moveTo(this.absoluteLineStart + e, this.absoluteLineStart) || !this.fragments.matches(this.block.hash))
      return !1;
    let t = this.fragments.takeNodes(this);
    return t ? (this.absoluteLineStart += t, this.lineStart = Lu(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++, this.readLine()) : (this.atEnd = !0, this.readLine()), !0) : !1;
  }
  /**
  The number of parent blocks surrounding the current block.
  */
  get depth() {
    return this.stack.length;
  }
  /**
  Get the type of the parent block at the given depth. When no
  depth is passed, return the type of the innermost parent.
  */
  parentType(e = this.depth - 1) {
    return this.parser.nodeSet.types[this.stack[e].type];
  }
  /**
  Move to the next input line. This should only be called by
  (non-composite) [block parsers](#BlockParser.parse) that consume
  the line directly, or leaf block parser
  [`nextLine`](#LeafBlockParser.nextLine) methods when they
  consume the current line (and return true).
  */
  nextLine() {
    return this.lineStart += this.line.text.length, this.absoluteLineEnd >= this.to ? (this.absoluteLineStart = this.absoluteLineEnd, this.atEnd = !0, this.readLine(), !1) : (this.lineStart++, this.absoluteLineStart = this.absoluteLineEnd + 1, this.moveRangeI(), this.readLine(), !0);
  }
  /**
  Retrieve the text of the line after the current one, without
  actually moving the context's current line forward.
  */
  peekLine() {
    return this.scanLine(this.absoluteLineEnd + 1).text;
  }
  moveRangeI() {
    for (; this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to; )
      this.rangeI++, this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
  }
  /**
  @internal
  Collect the text for the next line.
  */
  scanLine(e) {
    let t = i1;
    if (t.end = e, e >= this.to)
      t.text = "";
    else if (t.text = this.lineChunkAt(e), t.end += t.text.length, this.ranges.length > 1) {
      let i = this.absoluteLineStart, r = this.rangeI;
      for (; this.ranges[r].to < t.end; ) {
        r++;
        let s = this.ranges[r].from, l = this.lineChunkAt(s);
        t.end = s + l.length, t.text = t.text.slice(0, this.ranges[r - 1].to - i) + l, i = t.end - t.text.length;
      }
    }
    return t;
  }
  /**
  @internal
  Populate this.line with the content of the next line. Skip
  leading characters covered by composite blocks.
  */
  readLine() {
    let { line: e } = this, { text: t, end: i } = this.scanLine(this.absoluteLineStart);
    for (this.absoluteLineEnd = i, e.reset(t); e.depth < this.stack.length; e.depth++) {
      let r = this.stack[e.depth], s = this.parser.skipContextMarkup[r.type];
      if (!s)
        throw new Error("Unhandled block context " + k[r.type]);
      let l = this.line.markers.length;
      if (!s(r, this, e)) {
        this.line.markers.length > l && (r.end = this.line.markers[this.line.markers.length - 1].to), e.forward();
        break;
      }
      e.forward();
    }
  }
  lineChunkAt(e) {
    let t = this.input.chunk(e), i;
    if (this.input.lineChunks)
      i = t == `
` ? "" : t;
    else {
      let r = t.indexOf(`
`);
      i = r < 0 ? t : t.slice(0, r);
    }
    return e + i.length > this.to ? i.slice(0, this.to - e) : i;
  }
  /**
  The end position of the previous line.
  */
  prevLineEnd() {
    return this.atEnd ? this.lineStart : this.lineStart - 1;
  }
  /**
  @internal
  */
  startContext(e, t, i = 0) {
    this.block = Ar.create(e, i, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block);
  }
  /**
  Start a composite block. Should only be called from [block
  parser functions](#BlockParser.parse) that return null.
  */
  startComposite(e, t, i = 0) {
    this.startContext(this.parser.getNodeType(e), t, i);
  }
  /**
  @internal
  */
  addNode(e, t, i) {
    typeof e == "number" && (e = new _(this.parser.nodeSet.types[e], Si, Si, (i ?? this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from);
  }
  /**
  Add a block element. Can be called by [block
  parsers](#BlockParser.parse).
  */
  addElement(e) {
    this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from);
  }
  /**
  Add a block element from a [leaf parser](#LeafBlockParser). This
  makes sure any extra composite block markup (such as blockquote
  markers) inside the block are also added to the syntax tree.
  */
  addLeafElement(e, t) {
    this.addNode(this.buffer.writeElements(Al(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from);
  }
  /**
  @internal
  */
  finishContext() {
    let e = this.stack.pop(), t = this.stack[this.stack.length - 1];
    t.addChild(e.toTree(this.parser.nodeSet), e.from - t.from), this.block = t;
  }
  finish() {
    for (; this.stack.length > 1; )
      this.finishContext();
    return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
  }
  addGaps(e) {
    return this.ranges.length > 1 ? Pu(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e;
  }
  /**
  @internal
  */
  finishLeaf(e) {
    for (let i of e.parsers)
      if (i.finish(this, e))
        return;
    let t = Al(this.parser.parseInline(e.content, e.start), e.marks);
    this.addNode(this.buffer.writeElements(t, -e.start).finish(k.Paragraph, e.content.length), e.start);
  }
  elt(e, t, i, r) {
    return typeof e == "string" ? Y(this.parser.getNodeType(e), t, i, r) : new Zu(e, t);
  }
  /**
  @internal
  */
  get buffer() {
    return new Tu(this.parser.nodeSet);
  }
}
function Pu(n, e, t, i, r) {
  let s = n[e].to, l = [], o = [], a = t.from + i;
  function h(c, f) {
    for (; f ? c >= s : c > s; ) {
      let u = n[e + 1].from - s;
      i += u, c += u, e++, s = n[e].to;
    }
  }
  for (let c = t.firstChild; c; c = c.nextSibling) {
    h(c.from + i, !0);
    let f = c.from + i, u, O = r.get(c.tree);
    O ? u = O : c.to + i > s ? (u = Pu(n, e, c, i, r), h(c.to + i, !1)) : u = c.toTree(), l.push(u), o.push(f - a);
  }
  return h(t.to + i, !1), new _(t.type, l, o, t.to + i - a, t.tree ? t.tree.propValues : void 0);
}
class Kr extends ro {
  /**
  @internal
  */
  constructor(e, t, i, r, s, l, o, a, h) {
    super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = i, this.blockNames = r, this.endLeafBlock = s, this.skipContextMarkup = l, this.inlineParsers = o, this.inlineNames = a, this.wrappers = h, this.nodeTypes = /* @__PURE__ */ Object.create(null);
    for (let c of e.types)
      this.nodeTypes[c.name] = c.id;
  }
  createParse(e, t, i) {
    let r = new n1(this, e, t, i);
    for (let s of this.wrappers)
      r = s(r, e, t, i);
    return r;
  }
  /**
  Reconfigure the parser.
  */
  configure(e) {
    let t = Cl(e);
    if (!t)
      return this;
    let { nodeSet: i, skipContextMarkup: r } = this, s = this.blockParsers.slice(), l = this.leafBlockParsers.slice(), o = this.blockNames.slice(), a = this.inlineParsers.slice(), h = this.inlineNames.slice(), c = this.endLeafBlock.slice(), f = this.wrappers;
    if (Ei(t.defineNodes)) {
      r = Object.assign({}, r);
      let u = i.types.slice(), O;
      for (let d of t.defineNodes) {
        let { name: p, block: g, composite: S, style: y } = typeof d == "string" ? { name: d } : d;
        if (u.some(($) => $.name == p))
          continue;
        S && (r[u.length] = ($, v, x) => S(v, x, $.value));
        let b = u.length, A = S ? ["Block", "BlockContext"] : g ? b >= k.ATXHeading1 && b <= k.SetextHeading2 ? ["Block", "LeafBlock", "Heading"] : ["Block", "LeafBlock"] : void 0;
        u.push(le.define({
          id: b,
          name: p,
          props: A && [[R.group, A]]
        })), y && (O || (O = {}), Array.isArray(y) || y instanceof Ce ? O[p] = y : Object.assign(O, y));
      }
      i = new wn(u), O && (i = i.extend(Pi(O)));
    }
    if (Ei(t.props) && (i = i.extend(...t.props)), Ei(t.remove))
      for (let u of t.remove) {
        let O = this.blockNames.indexOf(u), d = this.inlineNames.indexOf(u);
        O > -1 && (s[O] = l[O] = void 0), d > -1 && (a[d] = void 0);
      }
    if (Ei(t.parseBlock))
      for (let u of t.parseBlock) {
        let O = o.indexOf(u.name);
        if (O > -1)
          s[O] = u.parse, l[O] = u.leaf;
        else {
          let d = u.before ? Hn(o, u.before) : u.after ? Hn(o, u.after) + 1 : o.length - 1;
          s.splice(d, 0, u.parse), l.splice(d, 0, u.leaf), o.splice(d, 0, u.name);
        }
        u.endLeaf && c.push(u.endLeaf);
      }
    if (Ei(t.parseInline))
      for (let u of t.parseInline) {
        let O = h.indexOf(u.name);
        if (O > -1)
          a[O] = u.parse;
        else {
          let d = u.before ? Hn(h, u.before) : u.after ? Hn(h, u.after) + 1 : h.length - 1;
          a.splice(d, 0, u.parse), h.splice(d, 0, u.name);
        }
      }
    return t.wrap && (f = f.concat(t.wrap)), new Kr(i, s, l, o, c, r, a, h, f);
  }
  /**
  @internal
  */
  getNodeType(e) {
    let t = this.nodeTypes[e];
    if (t == null)
      throw new RangeError(`Unknown node type '${e}'`);
    return t;
  }
  /**
  Parse the given piece of inline text at the given offset,
  returning an array of [`Element`](#Element) objects representing
  the inline content.
  */
  parseInline(e, t) {
    let i = new So(this, e, t);
    e: for (let r = t; r < i.end; ) {
      let s = i.char(r);
      for (let l of this.inlineParsers)
        if (l) {
          let o = l(i, s, r);
          if (o >= 0) {
            r = o;
            continue e;
          }
        }
      r++;
    }
    return i.resolveMarkers(0);
  }
}
function Ei(n) {
  return n != null && n.length > 0;
}
function Cl(n) {
  if (!Array.isArray(n))
    return n;
  if (n.length == 0)
    return null;
  let e = Cl(n[0]);
  if (n.length == 1)
    return e;
  let t = Cl(n.slice(1));
  if (!t || !e)
    return e || t;
  let i = (l, o) => (l || Si).concat(o || Si), r = e.wrap, s = t.wrap;
  return {
    props: i(e.props, t.props),
    defineNodes: i(e.defineNodes, t.defineNodes),
    parseBlock: i(e.parseBlock, t.parseBlock),
    parseInline: i(e.parseInline, t.parseInline),
    remove: i(e.remove, t.remove),
    wrap: r ? s ? (l, o, a, h) => r(s(l, o, a, h), o, a, h) : r : s
  };
}
function Hn(n, e) {
  let t = n.indexOf(e);
  if (t < 0)
    throw new RangeError(`Position specified relative to unknown parser ${e}`);
  return t;
}
let vu = [le.none];
for (let n = 1, e; e = k[n]; n++)
  vu[n] = le.define({
    id: n,
    name: e,
    props: n >= k.Escape ? [] : [[R.group, n in gu ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
    top: e == "Document"
  });
const Si = [];
class Tu {
  constructor(e) {
    this.nodeSet = e, this.content = [], this.nodes = [];
  }
  write(e, t, i, r = 0) {
    return this.content.push(e, t, i, 4 + r * 4), this;
  }
  writeElements(e, t = 0) {
    for (let i of e)
      i.writeTo(this, t);
    return this;
  }
  finish(e, t) {
    return _.build({
      buffer: this.content,
      nodeSet: this.nodeSet,
      reused: this.nodes,
      topID: e,
      length: t
    });
  }
}
let dn = class {
  /**
  @internal
  */
  constructor(e, t, i, r = Si) {
    this.type = e, this.from = t, this.to = i, this.children = r;
  }
  /**
  @internal
  */
  writeTo(e, t) {
    let i = e.content.length;
    e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - i);
  }
  /**
  @internal
  */
  toTree(e) {
    return new Tu(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
  }
};
class Zu {
  constructor(e, t) {
    this.tree = e, this.from = t;
  }
  get to() {
    return this.from + this.tree.length;
  }
  get type() {
    return this.tree.type.id;
  }
  get children() {
    return Si;
  }
  writeTo(e, t) {
    e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1);
  }
  toTree() {
    return this.tree;
  }
}
function Y(n, e, t, i) {
  return new dn(n, e, t, i);
}
const Cu = { resolve: "Emphasis", mark: "EmphasisMark" }, Au = { resolve: "Emphasis", mark: "EmphasisMark" }, _t = {}, Xr = {};
class Ze {
  constructor(e, t, i, r) {
    this.type = e, this.from = t, this.to = i, this.side = r;
  }
}
const sh = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
let pn = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
  pn = new RegExp("[\\p{S}|\\p{P}]", "u");
} catch {
}
const ks = {
  Escape(n, e, t) {
    if (e != 92 || t == n.end - 1)
      return -1;
    let i = n.char(t + 1);
    for (let r = 0; r < sh.length; r++)
      if (sh.charCodeAt(r) == i)
        return n.append(Y(k.Escape, t, t + 2));
    return -1;
  },
  Entity(n, e, t) {
    if (e != 38)
      return -1;
    let i = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(n.slice(t + 1, t + 31));
    return i ? n.append(Y(k.Entity, t, t + 1 + i[0].length)) : -1;
  },
  InlineCode(n, e, t) {
    if (e != 96 || t && n.char(t - 1) == 96)
      return -1;
    let i = t + 1;
    for (; i < n.end && n.char(i) == 96; )
      i++;
    let r = i - t, s = 0;
    for (; i < n.end; i++)
      if (n.char(i) == 96) {
        if (s++, s == r && n.char(i + 1) != 96)
          return n.append(Y(k.InlineCode, t, i + 1, [
            Y(k.CodeMark, t, t + r),
            Y(k.CodeMark, i + 1 - r, i + 1)
          ]));
      } else
        s = 0;
    return -1;
  },
  HTMLTag(n, e, t) {
    if (e != 60 || t == n.end - 1)
      return -1;
    let i = n.slice(t + 1, n.end), r = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(i);
    if (r)
      return n.append(Y(k.Autolink, t, t + 1 + r[0].length, [
        Y(k.LinkMark, t, t + 1),
        // url[0] includes the closing bracket, so exclude it from this slice
        Y(k.URL, t + 1, t + r[0].length),
        Y(k.LinkMark, t + r[0].length, t + 1 + r[0].length)
      ]));
    let s = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(i);
    if (s)
      return n.append(Y(k.Comment, t, t + 1 + s[0].length));
    let l = /^\?[^]*?\?>/.exec(i);
    if (l)
      return n.append(Y(k.ProcessingInstruction, t, t + 1 + l[0].length));
    let o = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(i);
    return o ? n.append(Y(k.HTMLTag, t, t + 1 + o[0].length)) : -1;
  },
  Emphasis(n, e, t) {
    if (e != 95 && e != 42)
      return -1;
    let i = t + 1;
    for (; n.char(i) == e; )
      i++;
    let r = n.slice(t - 1, t), s = n.slice(i, i + 1), l = pn.test(r), o = pn.test(s), a = /\s|^$/.test(r), h = /\s|^$/.test(s), c = !h && (!o || a || l), f = !a && (!l || h || o), u = c && (e == 42 || !f || l), O = f && (e == 42 || !c || o);
    return n.append(new Ze(e == 95 ? Cu : Au, t, i, (u ? 1 : 0) | (O ? 2 : 0)));
  },
  HardBreak(n, e, t) {
    if (e == 92 && n.char(t + 1) == 10)
      return n.append(Y(k.HardBreak, t, t + 2));
    if (e == 32) {
      let i = t + 1;
      for (; n.char(i) == 32; )
        i++;
      if (n.char(i) == 10 && i >= t + 2)
        return n.append(Y(k.HardBreak, t, i + 1));
    }
    return -1;
  },
  Link(n, e, t) {
    return e == 91 ? n.append(new Ze(
      _t,
      t,
      t + 1,
      1
      /* Mark.Open */
    )) : -1;
  },
  Image(n, e, t) {
    return e == 33 && n.char(t + 1) == 91 ? n.append(new Ze(
      Xr,
      t,
      t + 2,
      1
      /* Mark.Open */
    )) : -1;
  },
  LinkEnd(n, e, t) {
    if (e != 93)
      return -1;
    for (let i = n.parts.length - 1; i >= 0; i--) {
      let r = n.parts[i];
      if (r instanceof Ze && (r.type == _t || r.type == Xr)) {
        if (!r.side || n.skipSpace(r.to) == t && !/[(\[]/.test(n.slice(t + 1, t + 2)))
          return n.parts[i] = null, -1;
        let s = n.takeContent(i), l = n.parts[i] = r1(n, s, r.type == _t ? k.Link : k.Image, r.from, t + 1);
        if (r.type == _t)
          for (let o = 0; o < i; o++) {
            let a = n.parts[o];
            a instanceof Ze && a.type == _t && (a.side = 0);
          }
        return l.to;
      }
    }
    return -1;
  }
};
function r1(n, e, t, i, r) {
  let { text: s } = n, l = n.char(r), o = r;
  if (e.unshift(Y(k.LinkMark, i, i + (t == k.Image ? 2 : 1))), e.push(Y(k.LinkMark, r - 1, r)), l == 40) {
    let a = n.skipSpace(r + 1), h = Xu(s, a - n.offset, n.offset), c;
    h && (a = n.skipSpace(h.to), a != h.to && (c = Ru(s, a - n.offset, n.offset), c && (a = n.skipSpace(c.to)))), n.char(a) == 41 && (e.push(Y(k.LinkMark, r, r + 1)), o = a + 1, h && e.push(h), c && e.push(c), e.push(Y(k.LinkMark, a, o)));
  } else if (l == 91) {
    let a = Mu(s, r - n.offset, n.offset, !1);
    a && (e.push(a), o = a.to);
  }
  return Y(t, i, o, e);
}
function Xu(n, e, t) {
  if (n.charCodeAt(e) == 60) {
    for (let r = e + 1; r < n.length; r++) {
      let s = n.charCodeAt(r);
      if (s == 62)
        return Y(k.URL, e + t, r + 1 + t);
      if (s == 60 || s == 10)
        return !1;
    }
    return null;
  } else {
    let r = 0, s = e;
    for (let l = !1; s < n.length; s++) {
      let o = n.charCodeAt(s);
      if (ze(o))
        break;
      if (l)
        l = !1;
      else if (o == 40)
        r++;
      else if (o == 41) {
        if (!r)
          break;
        r--;
      } else o == 92 && (l = !0);
    }
    return s > e ? Y(k.URL, e + t, s + t) : s == n.length ? null : !1;
  }
}
function Ru(n, e, t) {
  let i = n.charCodeAt(e);
  if (i != 39 && i != 34 && i != 40)
    return !1;
  let r = i == 40 ? 41 : i;
  for (let s = e + 1, l = !1; s < n.length; s++) {
    let o = n.charCodeAt(s);
    if (l)
      l = !1;
    else {
      if (o == r)
        return Y(k.LinkTitle, e + t, s + 1 + t);
      o == 92 && (l = !0);
    }
  }
  return null;
}
function Mu(n, e, t, i) {
  for (let r = !1, s = e + 1, l = Math.min(n.length, s + 999); s < l; s++) {
    let o = n.charCodeAt(s);
    if (r)
      r = !1;
    else {
      if (o == 93)
        return i ? !1 : Y(k.LinkLabel, e + t, s + 1 + t);
      if (i && !ze(o) && (i = !1), o == 91)
        return !1;
      o == 92 && (r = !0);
    }
  }
  return null;
}
class So {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.parser = e, this.text = t, this.offset = i, this.parts = [];
  }
  /**
  Get the character code at the given (document-relative)
  position.
  */
  char(e) {
    return e >= this.end ? -1 : this.text.charCodeAt(e - this.offset);
  }
  /**
  The position of the end of this inline section.
  */
  get end() {
    return this.offset + this.text.length;
  }
  /**
  Get a substring of this inline section. Again uses
  document-relative positions.
  */
  slice(e, t) {
    return this.text.slice(e - this.offset, t - this.offset);
  }
  /**
  @internal
  */
  append(e) {
    return this.parts.push(e), e.to;
  }
  /**
  Add a [delimiter](#DelimiterType) at this given position. `open`
  and `close` indicate whether this delimiter is opening, closing,
  or both. Returns the end of the delimiter, for convenient
  returning from [parse functions](#InlineParser.parse).
  */
  addDelimiter(e, t, i, r, s) {
    return this.append(new Ze(e, t, i, (r ? 1 : 0) | (s ? 2 : 0)));
  }
  /**
  Returns true when there is an unmatched link or image opening
  token before the current position.
  */
  get hasOpenLink() {
    for (let e = this.parts.length - 1; e >= 0; e--) {
      let t = this.parts[e];
      if (t instanceof Ze && (t.type == _t || t.type == Xr))
        return !0;
    }
    return !1;
  }
  /**
  Add an inline element. Returns the end of the element.
  */
  addElement(e) {
    return this.append(e);
  }
  /**
  Resolve markers between this.parts.length and from, wrapping matched markers in the
  appropriate node and updating the content of this.parts. @internal
  */
  resolveMarkers(e) {
    for (let i = e; i < this.parts.length; i++) {
      let r = this.parts[i];
      if (!(r instanceof Ze && r.type.resolve && r.side & 2))
        continue;
      let s = r.type == Cu || r.type == Au, l = r.to - r.from, o, a = i - 1;
      for (; a >= e; a--) {
        let p = this.parts[a];
        if (p instanceof Ze && p.side & 1 && p.type == r.type && // Ignore emphasis delimiters where the character count doesn't match
        !(s && (r.side & 1 || p.side & 2) && (p.to - p.from + l) % 3 == 0 && ((p.to - p.from) % 3 || l % 3))) {
          o = p;
          break;
        }
      }
      if (!o)
        continue;
      let h = r.type.resolve, c = [], f = o.from, u = r.to;
      if (s) {
        let p = Math.min(2, o.to - o.from, l);
        f = o.to - p, u = r.from + p, h = p == 1 ? "Emphasis" : "StrongEmphasis";
      }
      o.type.mark && c.push(this.elt(o.type.mark, f, o.to));
      for (let p = a + 1; p < i; p++)
        this.parts[p] instanceof dn && c.push(this.parts[p]), this.parts[p] = null;
      r.type.mark && c.push(this.elt(r.type.mark, r.from, u));
      let O = this.elt(h, f, u, c);
      this.parts[a] = s && o.from != f ? new Ze(o.type, o.from, f, o.side) : null, (this.parts[i] = s && r.to != u ? new Ze(r.type, u, r.to, r.side) : null) ? this.parts.splice(i, 0, O) : this.parts[i] = O;
    }
    let t = [];
    for (let i = e; i < this.parts.length; i++) {
      let r = this.parts[i];
      r instanceof dn && t.push(r);
    }
    return t;
  }
  /**
  Find an opening delimiter of the given type. Returns `null` if
  no delimiter is found, or an index that can be passed to
  [`takeContent`](#InlineContext.takeContent) otherwise.
  */
  findOpeningDelimiter(e) {
    for (let t = this.parts.length - 1; t >= 0; t--) {
      let i = this.parts[t];
      if (i instanceof Ze && i.type == e && i.side & 1)
        return t;
    }
    return null;
  }
  /**
  Remove all inline elements and delimiters starting from the
  given index (which you should get from
  [`findOpeningDelimiter`](#InlineContext.findOpeningDelimiter),
  resolve delimiters inside of them, and return them as an array
  of elements.
  */
  takeContent(e) {
    let t = this.resolveMarkers(e);
    return this.parts.length = e, t;
  }
  /**
  Return the delimiter at the given index. Mostly useful to get
  additional info out of a delimiter index returned by
  [`findOpeningDelimiter`](#InlineContext.findOpeningDelimiter).
  Returns null if there is no delimiter at this index.
  */
  getDelimiterAt(e) {
    let t = this.parts[e];
    return t instanceof Ze ? t : null;
  }
  /**
  Skip space after the given (document) position, returning either
  the position of the next non-space character or the end of the
  section.
  */
  skipSpace(e) {
    return en(this.text, e - this.offset) + this.offset;
  }
  elt(e, t, i, r) {
    return typeof e == "string" ? Y(this.parser.getNodeType(e), t, i, r) : new Zu(e, t);
  }
}
So.linkStart = _t;
So.imageStart = Xr;
function Al(n, e) {
  if (!e.length)
    return n;
  if (!n.length)
    return e;
  let t = n.slice(), i = 0;
  for (let r of e) {
    for (; i < t.length && t[i].to < r.to; )
      i++;
    if (i < t.length && t[i].from < r.from) {
      let s = t[i];
      s instanceof dn && (t[i] = new dn(s.type, s.from, s.to, Al(s.children, [r])));
    } else
      t.splice(i++, 0, r);
  }
  return t;
}
const s1 = [k.CodeBlock, k.ListItem, k.OrderedList, k.BulletList];
let l1 = class {
  constructor(e, t) {
    this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++]);
  }
  nextFragment() {
    this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1;
  }
  moveTo(e, t) {
    for (; this.fragment && this.fragment.to <= e; )
      this.nextFragment();
    if (!this.fragment || this.fragment.from > (e ? e - 1 : 0))
      return !1;
    if (this.fragmentEnd < 0) {
      let s = this.fragment.to;
      for (; s > 0 && this.input.read(s - 1, s) != `
`; )
        s--;
      this.fragmentEnd = s ? s - 1 : 0;
    }
    let i = this.cursor;
    i || (i = this.cursor = this.fragment.tree.cursor(), i.firstChild());
    let r = e + this.fragment.offset;
    for (; i.to <= r; )
      if (!i.parent())
        return !1;
    for (; ; ) {
      if (i.from >= r)
        return this.fragment.from <= t;
      if (!i.childAfter(r))
        return !1;
    }
  }
  matches(e) {
    let t = this.cursor.tree;
    return t && t.prop(R.contextHash) == e;
  }
  takeNodes(e) {
    let t = this.cursor, i = this.fragment.offset, r = this.fragmentEnd - (this.fragment.openEnd ? 1 : 0), s = e.absoluteLineStart, l = s, o = e.block.children.length, a = l, h = o;
    for (; ; ) {
      if (t.to - i > r) {
        if (t.type.isAnonymous && t.firstChild())
          continue;
        break;
      }
      let c = Lu(t.from - i, e.ranges);
      if (t.to - i <= e.ranges[e.rangeI].to)
        e.addNode(t.tree, c);
      else {
        let f = new _(e.parser.nodeSet.types[k.Paragraph], [], [], 0, e.block.hashProp);
        e.reusePlaceholders.set(f, t.tree), e.addNode(f, c);
      }
      if (t.type.is("Block") && (s1.indexOf(t.type.id) < 0 ? (l = t.to - i, o = e.block.children.length) : (l = a, o = h), a = t.to - i, h = e.block.children.length), !t.nextSibling())
        break;
    }
    for (; e.block.children.length > o; )
      e.block.children.pop(), e.block.positions.pop();
    return l - s;
  }
};
function Lu(n, e) {
  let t = n;
  for (let i = 1; i < e.length; i++) {
    let r = e[i - 1].to, s = e[i].from;
    r < n && (t -= s - r);
  }
  return t;
}
const o1 = Pi({
  "Blockquote/...": m.quote,
  HorizontalRule: m.contentSeparator,
  "ATXHeading1/... SetextHeading1/...": m.heading1,
  "ATXHeading2/... SetextHeading2/...": m.heading2,
  "ATXHeading3/...": m.heading3,
  "ATXHeading4/...": m.heading4,
  "ATXHeading5/...": m.heading5,
  "ATXHeading6/...": m.heading6,
  "Comment CommentBlock": m.comment,
  Escape: m.escape,
  Entity: m.character,
  "Emphasis/...": m.emphasis,
  "StrongEmphasis/...": m.strong,
  "Link/... Image/...": m.link,
  "OrderedList/... BulletList/...": m.list,
  "BlockQuote/...": m.quote,
  "InlineCode CodeText": m.monospace,
  "URL Autolink": m.url,
  "HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": m.processingInstruction,
  "CodeInfo LinkLabel": m.labelName,
  LinkTitle: m.string,
  Paragraph: m.content
}), a1 = new Kr(new wn(vu).extend(o1), Object.keys(Fn).map((n) => Fn[n]), Object.keys(Fn).map((n) => $u[n]), Object.keys(Fn), t1, gu, Object.keys(ks).map((n) => ks[n]), Object.keys(ks), []);
function h1(n, e, t) {
  let i = [];
  for (let r = n.firstChild, s = e; ; r = r.nextSibling) {
    let l = r ? r.from : t;
    if (l > s && i.push({ from: s, to: l }), !r)
      break;
    s = r.to;
  }
  return i;
}
function c1(n) {
  let { codeParser: e, htmlParser: t } = n;
  return { wrap: Zf((r, s) => {
    let l = r.type.id;
    if (e && (l == k.CodeBlock || l == k.FencedCode)) {
      let o = "";
      if (l == k.FencedCode) {
        let h = r.node.getChild(k.CodeInfo);
        h && (o = s.read(h.from, h.to));
      }
      let a = e(o);
      if (a)
        return { parser: a, overlay: (h) => h.type.id == k.CodeText, bracketed: l == k.FencedCode };
    } else if (t && (l == k.HTMLBlock || l == k.HTMLTag || l == k.CommentBlock))
      return { parser: t, overlay: h1(r.node, r.from, r.to) };
    return null;
  }) };
}
const f1 = { resolve: "Strikethrough", mark: "StrikethroughMark" }, u1 = {
  defineNodes: [{
    name: "Strikethrough",
    style: { "Strikethrough/...": m.strikethrough }
  }, {
    name: "StrikethroughMark",
    style: m.processingInstruction
  }],
  parseInline: [{
    name: "Strikethrough",
    parse(n, e, t) {
      if (e != 126 || n.char(t + 1) != 126 || n.char(t + 2) == 126)
        return -1;
      let i = n.slice(t - 1, t), r = n.slice(t + 2, t + 3), s = /\s|^$/.test(i), l = /\s|^$/.test(r), o = pn.test(i), a = pn.test(r);
      return n.addDelimiter(f1, t, t + 2, !l && (!a || s || o), !s && (!o || l || a));
    },
    after: "Emphasis"
  }]
};
function tn(n, e, t = 0, i, r = 0) {
  let s = 0, l = !0, o = -1, a = -1, h = !1, c = () => {
    i.push(n.elt("TableCell", r + o, r + a, n.parser.parseInline(e.slice(o, a), r + o)));
  };
  for (let f = t; f < e.length; f++) {
    let u = e.charCodeAt(f);
    u == 124 && !h ? ((!l || o > -1) && s++, l = !1, i && (o > -1 && c(), i.push(n.elt("TableDelimiter", f + r, f + r + 1))), o = a = -1) : (h || u != 32 && u != 9) && (o < 0 && (o = f), a = f + 1), h = !h && u == 92;
  }
  return o > -1 && (s++, i && c()), s;
}
function lh(n, e) {
  for (let t = e; t < n.length; t++) {
    let i = n.charCodeAt(t);
    if (i == 124)
      return !0;
    i == 92 && t++;
  }
  return !1;
}
const ju = /^[>\s]*\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/;
class oh {
  constructor() {
    this.rows = null;
  }
  nextLine(e, t, i) {
    if (this.rows == null) {
      this.rows = !1;
      let r;
      if ((t.next == 45 || t.next == 58 || t.next == 124) && ju.test(r = t.text.slice(t.pos))) {
        let s = [];
        tn(e, i.content, 0, s, i.start) == tn(e, r, 0) && (this.rows = [
          e.elt("TableHeader", i.start, i.start + i.content.length, s),
          e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)
        ]);
      }
    } else if (this.rows) {
      let r = [];
      tn(e, t.text, t.pos, r, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, r));
    }
    return !1;
  }
  finish(e, t) {
    return this.rows ? (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), !0) : !1;
  }
}
const O1 = {
  defineNodes: [
    { name: "Table", block: !0 },
    { name: "TableHeader", style: { "TableHeader/...": m.heading } },
    "TableRow",
    { name: "TableCell", style: m.content },
    { name: "TableDelimiter", style: m.processingInstruction }
  ],
  parseBlock: [{
    name: "Table",
    leaf(n, e) {
      return lh(e.content, 0) ? new oh() : null;
    },
    endLeaf(n, e, t) {
      if (t.parsers.some((r) => r instanceof oh) || !lh(e.text, e.basePos))
        return !1;
      let i = n.peekLine();
      return ju.test(i) && tn(n, e.text, e.basePos) == tn(n, i, e.basePos);
    },
    before: "SetextHeading"
  }]
};
class d1 {
  nextLine() {
    return !1;
  }
  finish(e, t) {
    return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [
      e.elt("TaskMarker", t.start, t.start + 3),
      ...e.parser.parseInline(t.content.slice(3), t.start + 3)
    ])), !0;
  }
}
const p1 = {
  defineNodes: [
    { name: "Task", block: !0, style: m.list },
    { name: "TaskMarker", style: m.atom }
  ],
  parseBlock: [{
    name: "TaskList",
    leaf(n, e) {
      return /^\[[ xX]\][ \t]/.test(e.content) && n.parentType().name == "ListItem" ? new d1() : null;
    },
    after: "SetextHeading"
  }]
}, ah = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy, hh = /[\w-]+(\.[\w-]+)+(:\d+)?(\/[^\s<]*)?/gy, g1 = /[\w-]+\.[\w-]+($|[/:])/, ch = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy, fh = /\/[a-zA-Z\d@.]+/gy;
function uh(n, e, t, i) {
  let r = 0;
  for (let s = e; s < t; s++)
    n[s] == i && r++;
  return r;
}
function m1(n, e) {
  hh.lastIndex = e;
  let t = hh.exec(n);
  if (!t || g1.exec(t[0])[0].indexOf("_") > -1)
    return -1;
  let i = e + t[0].length;
  for (; ; ) {
    let r = n[i - 1], s;
    if (/[?!.,:*_~]/.test(r) || r == ")" && uh(n, e, i, ")") > uh(n, e, i, "("))
      i--;
    else if (r == ";" && (s = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(n.slice(e, i))))
      i = e + s.index;
    else
      break;
  }
  return i;
}
function Oh(n, e) {
  ch.lastIndex = e;
  let t = ch.exec(n);
  if (!t)
    return -1;
  let i = t[0][t[0].length - 1];
  return i == "_" || i == "-" ? -1 : e + t[0].length - (i == "." ? 1 : 0);
}
const S1 = {
  parseInline: [{
    name: "Autolink",
    parse(n, e, t) {
      let i = t - n.offset;
      if (i && /\w/.test(n.text[i - 1]))
        return -1;
      ah.lastIndex = i;
      let r = ah.exec(n.text), s = -1;
      if (!r)
        return -1;
      if (r[1] || r[2]) {
        if (s = m1(n.text, i + r[0].length), s > -1 && n.hasOpenLink) {
          let l = /([^\[\]]|\[[^\]]*\])*/.exec(n.text.slice(i, s));
          s = i + l[0].length;
        }
      } else r[3] ? s = Oh(n.text, i) : (s = Oh(n.text, i + r[0].length), s > -1 && r[0] == "xmpp:" && (fh.lastIndex = s, r = fh.exec(n.text), r && (s = r.index + r[0].length)));
      return s < 0 ? -1 : (n.addElement(n.elt("URL", t, s + n.offset)), s + n.offset);
    }
  }]
}, Q1 = [O1, p1, u1, S1];
function Eu(n, e, t) {
  return (i, r, s) => {
    if (r != n || i.char(s + 1) == n)
      return -1;
    let l = [i.elt(t, s, s + 1)];
    for (let o = s + 1; o < i.end; o++) {
      let a = i.char(o);
      if (a == n)
        return i.addElement(i.elt(e, s, o + 1, l.concat(i.elt(t, o, o + 1))));
      if (a == 92 && l.push(i.elt("Escape", o, o++ + 2)), ze(a))
        break;
    }
    return -1;
  };
}
const b1 = {
  defineNodes: [
    { name: "Superscript", style: m.special(m.content) },
    { name: "SuperscriptMark", style: m.processingInstruction }
  ],
  parseInline: [{
    name: "Superscript",
    parse: Eu(94, "Superscript", "SuperscriptMark")
  }]
}, y1 = {
  defineNodes: [
    { name: "Subscript", style: m.special(m.content) },
    { name: "SubscriptMark", style: m.processingInstruction }
  ],
  parseInline: [{
    name: "Subscript",
    parse: Eu(126, "Subscript", "SubscriptMark")
  }]
}, k1 = {
  defineNodes: [{ name: "Emoji", style: m.character }],
  parseInline: [{
    name: "Emoji",
    parse(n, e, t) {
      let i;
      return e != 58 || !(i = /^[a-zA-Z_0-9]+:/.exec(n.slice(t + 1, n.end))) ? -1 : n.addElement(n.elt("Emoji", t, t + 1 + i[0].length));
    }
  }]
};
class Rr {
  /**
  @internal
  */
  constructor(e, t, i, r, s, l, o, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = r, this.pos = s, this.score = l, this.buffer = o, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(e, t, i = 0) {
    let r = e.parser.context;
    return new Rr(e, [], t, i, i, 0, [], 0, r ? new dh(r, r.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(e) {
    var t;
    let i = e >> 19, r = e & 65535, { parser: s } = this.p, l = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), o = s.dynamicPrecedence(r);
    if (o && (this.score += o), i == 0) {
      r < s.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(s.getGoto(this.state, r, !0), this.reducePos), r < s.minRepeatTerm && this.storeNode(r, this.reducePos, this.reducePos, l ? 8 : 4, !0), this.reduceContext(r, this.reducePos);
      return;
    }
    let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from;
    r < s.minRepeatTerm && h == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
    let c = this.reducePos - h;
    c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[r]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
    let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
    if (r < s.minRepeatTerm || e & 131072) {
      let O = s.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(r, h, O, u + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[a];
    else {
      let O = this.stack[a - 3];
      this.state = s.getGoto(O, r, !0);
    }
    for (; this.stack.length > a; )
      this.stack.pop();
    this.reduceContext(r, h);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(e, t, i, r = 4, s = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let l = this.buffer.length;
      if (l > 0 && this.buffer[l - 4] == 0 && this.buffer[l - 1] > -1) {
        if (t == i)
          return;
        if (this.buffer[l - 2] >= t) {
          this.buffer[l - 2] = i;
          return;
        }
      }
    }
    if (!s || this.pos == i)
      this.buffer.push(e, t, i, r);
    else {
      let l = this.buffer.length;
      if (l > 0 && (this.buffer[l - 4] != 0 || this.buffer[l - 1] < 0)) {
        let o = !1;
        for (let a = l; a > 0 && this.buffer[a - 2] > i; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            o = !0;
            break;
          }
        if (o)
          for (; l > 0 && this.buffer[l - 2] > i; )
            this.buffer[l] = this.buffer[l - 4], this.buffer[l + 1] = this.buffer[l - 3], this.buffer[l + 2] = this.buffer[l - 2], this.buffer[l + 3] = this.buffer[l - 1], l -= 4, r > 4 && (r -= 4);
      }
      this.buffer[l] = e, this.buffer[l + 1] = t, this.buffer[l + 2] = i, this.buffer[l + 3] = r;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, i, r) {
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if ((e & 262144) == 0) {
      let s = e, { parser: l } = this.p;
      this.pos = r;
      let o = l.stateFlag(
        s,
        1
        /* StateFlag.Skipped */
      );
      !o && (r > i || t <= l.maxNode) && (this.reducePos = r), this.pushState(s, o ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= l.maxNode && this.buffer.push(t, i, r, 4);
    } else
      this.pos = r, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, r, 4);
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, i, r) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i, r);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let r = this.pos;
    this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(
      i,
      r,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let e = this, t = e.buffer.length;
    for (t && e.buffer[t - 4] == 0 && (t -= 4); t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), r = e.bufferBase + t;
    for (; e && r == e.bufferBase; )
      e = e.parent;
    return new Rr(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, r, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new x1(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if ((i & 65536) == 0)
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let r = [];
      for (let s = 0, l; s < t.length; s += 2)
        (l = t[s + 1]) != this.state && this.p.parser.hasAction(l, e) && r.push(t[s], l);
      if (this.stack.length < 120)
        for (let s = 0; r.length < 8 && s < t.length; s += 2) {
          let l = t[s + 1];
          r.some((o, a) => a & 1 && o == l) || r.push(t[s], l);
        }
      t = r;
    }
    let i = [];
    for (let r = 0; r < t.length && i.length < 4; r += 2) {
      let s = t[r + 1];
      if (s == this.state)
        continue;
      let l = this.split();
      l.pushState(s, this.pos), l.storeNode(0, l.pos, l.pos, 4, !0), l.shiftContext(t[r], this.pos), l.reducePos = this.pos, l.score -= 200, i.push(l);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if ((t & 65536) == 0)
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, r = t & 65535, s = this.stack.length - i * 3;
      if (s < 0 || e.getGoto(this.stack[s], r, !1) < 0) {
        let l = this.findForcedReduction();
        if (l == null)
          return !1;
        t = l;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (r, s) => {
      if (!t.includes(r))
        return t.push(r), e.allActions(r, (l) => {
          if (!(l & 393216)) if (l & 65536) {
            let o = (l >> 19) - s;
            if (o > 1) {
              let a = l & 65535, h = this.stack.length - o * 3;
              if (h >= 0 && e.getGoto(this.stack[h], a, !1) >= 0)
                return o << 19 | 65536 | a;
            }
          } else {
            let o = i(l, s + 1);
            if (o != null)
              return o;
          }
        });
    };
    return i(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /**
  @internal
  */
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new dh(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /**
  @internal
  */
  setLookAhead(e) {
    return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
  }
  /**
  @internal
  */
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class dh {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class x1 {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = r;
  }
}
class Mr {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new Mr(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new Mr(this.stack, this.pos, this.index);
  }
}
function Vi(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, r = 0; i < n.length; ) {
    let s = 0;
    for (; ; ) {
      let l = n.charCodeAt(i++), o = !1;
      if (l == 126) {
        s = 65535;
        break;
      }
      l >= 92 && l--, l >= 34 && l--;
      let a = l - 32;
      if (a >= 46 && (a -= 46, o = !0), s += a, o)
        break;
      s *= 46;
    }
    t ? t[r++] = s : t = new e(s);
  }
  return t;
}
class fr {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const ph = new fr();
class w1 {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = ph, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let i = this.range, r = this.rangeIndex, s = this.pos + e;
    for (; s < i.from; ) {
      if (!r)
        return null;
      let l = this.ranges[--r];
      s -= i.from - l.to, i = l;
    }
    for (; t < 0 ? s > i.to : s >= i.to; ) {
      if (r == this.ranges.length - 1)
        return null;
      let l = this.ranges[++r];
      s += l.from - i.to, i = l;
    }
    return s;
  }
  /**
  @internal
  */
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(e) {
    let t = this.chunkOff + e, i, r;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, r = this.chunk.charCodeAt(t);
    else {
      let s = this.resolveOffset(e, 1);
      if (s == null)
        return -1;
      if (i = s, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        r = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let l = this.rangeIndex, o = this.range;
        for (; o.to <= i; )
          o = this.ranges[++l];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > o.to && (this.chunk2 = this.chunk2.slice(0, o.to - i)), r = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), r;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(e, t) {
    this.token.value = e, this.token.end = t;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /**
  @internal
  */
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = ph, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let r of this.ranges) {
      if (r.from >= t)
        break;
      r.to > e && (i += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
    }
    return i;
  }
}
class hi {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    Yu(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
}
hi.prototype.contextual = hi.prototype.fallback = hi.prototype.extend = !1;
class Lr {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? Vi(e) : e;
  }
  token(e, t) {
    let i = e.pos, r = 0;
    for (; ; ) {
      let s = e.next < 0, l = e.resolveOffset(1, 1);
      if (Yu(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (s || r++, l == null)
        break;
      e.reset(l, e.token);
    }
    r && (e.reset(i, e.token), e.acceptToken(this.elseToken, r));
  }
}
Lr.prototype.contextual = hi.prototype.fallback = hi.prototype.extend = !1;
class Xe {
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function Yu(n, e, t, i, r, s) {
  let l = 0, o = 1 << i, { dialect: a } = t.p.parser;
  e: for (; (o & n[l]) != 0; ) {
    let h = n[l + 1];
    for (let O = l + 3; O < h; O += 2)
      if ((n[O + 1] & o) > 0) {
        let d = n[O];
        if (a.allows(d) && (e.token.value == -1 || e.token.value == d || $1(d, e.token.value, r, s))) {
          e.acceptToken(d);
          break;
        }
      }
    let c = e.next, f = 0, u = n[l + 2];
    if (e.next < 0 && u > f && n[h + u * 3 - 3] == 65535) {
      l = n[h + u * 3 - 1];
      continue e;
    }
    for (; f < u; ) {
      let O = f + u >> 1, d = h + O + (O << 1), p = n[d], g = n[d + 1] || 65536;
      if (c < p)
        u = O;
      else if (c >= g)
        f = O + 1;
      else {
        l = n[d + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function gh(n, e, t) {
  for (let i = e, r; (r = n[i]) != 65535; i++)
    if (r == t)
      return i - e;
  return -1;
}
function $1(n, e, t, i) {
  let r = gh(t, i, e);
  return r < 0 || gh(t, i, n) < r;
}
const Pe = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let xs = null;
function mh(n, e, t) {
  let i = n.cursor(W.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class P1 {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? mh(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? mh(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], r = this.index[t];
      if (r == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let s = i.children[r], l = this.start[t] + i.positions[r];
      if (l > e)
        return this.nextStart = l, null;
      if (s instanceof _) {
        if (l == e) {
          if (l < this.safeFrom)
            return null;
          let o = l + s.length;
          if (o <= this.safeTo) {
            let a = s.prop(R.lookAhead);
            if (!a || o + a < this.fragment.to)
              return s;
          }
        }
        this.index[t]++, l + s.length >= Math.max(this.safeFrom, e) && (this.trees.push(s), this.start.push(l), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = l + s.length;
    }
  }
}
class v1 {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new fr());
  }
  getActions(e) {
    let t = 0, i = null, { parser: r } = e.p, { tokenizers: s } = r, l = r.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), o = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < s.length; h++) {
      if ((1 << h & l) == 0)
        continue;
      let c = s[h], f = this.tokens[h];
      if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != l || f.context != o) && (this.updateCachedToken(f, c, e), f.mask = l, f.context = o), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let u = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new fr(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new fr(), { pos: i, p: r } = e;
    return t.start = i, t.end = Math.min(i + 1, r.stream.end), t.value = i == r.stream.end ? r.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let r = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(r, e), i), e.value > -1) {
      let { parser: s } = i.p;
      for (let l = 0; l < s.specialized.length; l++)
        if (s.specialized[l] == e.value) {
          let o = s.specializers[l](this.stream.read(e.start, e.end), i);
          if (o >= 0 && i.p.parser.dialect.allows(o >> 1)) {
            (o & 1) == 0 ? e.value = o >> 1 : e.extended = o >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(r + 1);
  }
  putAction(e, t, i, r) {
    for (let s = 0; s < r; s += 3)
      if (this.actions[s] == e)
        return r;
    return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = i, r;
  }
  addActions(e, t, i, r) {
    let { state: s } = e, { parser: l } = e.p, { data: o } = l;
    for (let a = 0; a < 2; a++)
      for (let h = l.stateSlot(
        s,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (o[h] == 65535)
          if (o[h + 1] == 1)
            h = ct(o, h + 2);
          else {
            r == 0 && o[h + 1] == 2 && (r = this.putAction(ct(o, h + 2), t, i, r));
            break;
          }
        o[h] == t && (r = this.putAction(ct(o, h + 1), t, i, r));
      }
    return r;
  }
}
class T1 {
  constructor(e, t, i, r) {
    this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new w1(t, r), this.tokens = new v1(e, this.stream), this.topTerm = e.top[1];
    let { from: s } = r[0];
    this.stacks = [Rr.start(this, e.top[0], s)], this.fragments = i.length && this.stream.end - s > e.bufferLength * 4 ? new P1(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], r, s;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [l] = e;
      for (; l.forceReduce() && l.stack.length && l.stack[l.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let l = 0; l < e.length; l++) {
      let o = e[l];
      for (; ; ) {
        if (this.tokens.mainToken = null, o.pos > t)
          i.push(o);
        else {
          if (this.advanceStack(o, i, e))
            continue;
          {
            r || (r = [], s = []), r.push(o);
            let a = this.tokens.getMainToken(o);
            s.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let l = r && C1(r);
      if (l)
        return Pe && console.log("Finish with " + this.stackID(l)), this.stackToTree(l);
      if (this.parser.strict)
        throw Pe && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && r) {
      let l = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, s, i);
      if (l)
        return Pe && console.log("Force-finish " + this.stackID(l)), this.stackToTree(l.forceAll());
    }
    if (this.recovering) {
      let l = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > l)
        for (i.sort((o, a) => a.score - o.score); i.length > l; )
          i.pop();
      i.some((o) => o.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e: for (let l = 0; l < i.length - 1; l++) {
        let o = i[l];
        for (let a = l + 1; a < i.length; a++) {
          let h = i[a];
          if (o.sameState(h) || o.buffer.length > 500 && h.buffer.length > 500)
            if ((o.score - h.score || o.buffer.length - h.buffer.length) > 0)
              i.splice(a--, 1);
            else {
              i.splice(l--, 1);
              continue e;
            }
        }
      }
      i.length > 12 && (i.sort((l, o) => o.score - l.score), i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = i[0].pos;
    for (let l = 1; l < i.length; l++)
      i[l].pos < this.minStackPos && (this.minStackPos = i[l].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let r = e.pos, { parser: s } = this, l = Pe ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && r > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(r); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? s.getGoto(e.state, f.type.id) : -1;
        if (u > -1 && f.length && (!h || (f.prop(R.contextHash) || 0) == c))
          return e.useNode(f, u), Pe && console.log(l + this.stackID(e) + ` (via reuse of ${s.getName(f.type.id)})`), !0;
        if (!(f instanceof _) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let O = f.children[0];
        if (O instanceof _ && f.positions[0] == 0)
          f = O;
        else
          break;
      }
    }
    let o = s.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (o > 0)
      return e.reduce(o), Pe && console.log(l + this.stackID(e) + ` (via always-reduce ${s.getName(
        o & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], u = a[h++], O = h == a.length || !i, d = O ? e : e.split(), p = this.tokens.mainToken;
      if (d.apply(c, f, p ? p.start : d.pos, u), Pe && console.log(l + this.stackID(d) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${s.getName(
        c & 65535
        /* Action.ValueMask */
      )}`} for ${s.getName(f)} @ ${r}${d == e ? "" : ", split"})`), O)
        return !0;
      d.pos > r ? t.push(d) : i.push(d);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return Sh(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let r = null, s = !1;
    for (let l = 0; l < e.length; l++) {
      let o = e[l], a = t[l << 1], h = t[(l << 1) + 1], c = Pe ? this.stackID(o) + " -> " : "";
      if (o.deadEnd && (s || (s = !0, o.restart(), Pe && console.log(c + this.stackID(o) + " (restarted)"), this.advanceFully(o, i))))
        continue;
      let f = o.split(), u = c;
      for (let O = 0; O < 10 && f.forceReduce() && (Pe && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); O++)
        Pe && (u = this.stackID(f) + " -> ");
      for (let O of o.recoverByInsert(a))
        Pe && console.log(c + this.stackID(O) + " (via recover-insert)"), this.advanceFully(O, i);
      this.stream.end > o.pos ? (h == o.pos && (h++, a = 0), o.recoverByDelete(a, h), Pe && console.log(c + this.stackID(o) + ` (via recover-delete ${this.parser.getName(a)})`), Sh(o, i)) : (!r || r.score < f.score) && (r = f);
    }
    return r;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), _.build({
      buffer: Mr.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (xs || (xs = /* @__PURE__ */ new WeakMap())).get(e);
    return t || xs.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function Sh(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class Z1 {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const ws = (n) => n;
class zu {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || ws, this.reduce = e.reduce || ws, this.reuse = e.reuse || ws, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class Qi extends ro {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let o = 0; o < e.repeatNodeCount; o++)
      t.push("");
    let i = Object.keys(e.topRules).map((o) => e.topRules[o][1]), r = [];
    for (let o = 0; o < t.length; o++)
      r.push([]);
    function s(o, a, h) {
      r[o].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let o of e.nodeProps) {
        let a = o[0];
        typeof a == "string" && (a = R[a]);
        for (let h = 1; h < o.length; ) {
          let c = o[h++];
          if (c >= 0)
            s(c, a, o[h++]);
          else {
            let f = o[h + -c];
            for (let u = -c; u > 0; u--)
              s(o[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new wn(t.map((o, a) => le.define({
      name: a >= this.minRepeatTerm ? void 0 : o,
      id: a,
      props: r[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = wf;
    let l = Vi(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let o = 0; o < this.specializerSpecs.length; o++)
      this.specialized[o] = this.specializerSpecs[o].term;
    this.specializers = this.specializerSpecs.map(Qh), this.states = Vi(e.states, Uint32Array), this.data = Vi(e.stateData), this.goto = Vi(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((o) => typeof o == "number" ? new hi(l, o) : o), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let r = new T1(this, e, t, i);
    for (let s of this.wrappers)
      r = s(r, e, t, i);
    return r;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, i = !1) {
    let r = this.goto;
    if (t >= r[0])
      return -1;
    for (let s = r[t + 1]; ; ) {
      let l = r[s++], o = l & 1, a = r[s++];
      if (o && i)
        return a;
      for (let h = s + (l >> 1); s < h; s++)
        if (r[s] == e)
          return a;
      if (o)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(e, t) {
    let i = this.data;
    for (let r = 0; r < 2; r++)
      for (let s = this.stateSlot(
        e,
        r ? 2 : 1
        /* ParseState.Actions */
      ), l; ; s += 3) {
        if ((l = i[s]) == 65535)
          if (i[s + 1] == 1)
            l = i[s = ct(i, s + 2)];
          else {
            if (i[s + 1] == 2)
              return ct(i, s + 2);
            break;
          }
        if (l == t || l == 0)
          return ct(i, s + 1);
      }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /**
  @internal
  */
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /**
  @internal
  */
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), r = i ? t(i) : void 0;
    for (let s = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); r == null; s += 3) {
      if (this.data[s] == 65535)
        if (this.data[s + 1] == 1)
          s = ct(this.data, s + 2);
        else
          break;
      r = t(ct(this.data, s + 1));
    }
    return r;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = ct(this.data, i + 2);
        else
          break;
      if ((this.data[i + 2] & 1) == 0) {
        let r = this.data[i + 1];
        t.some((s, l) => l & 1 && s == r) || t.push(this.data[i], r);
      }
    }
    return t;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(e) {
    let t = Object.assign(Object.create(Qi.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let r = e.tokenizers.find((s) => s.from == i);
      return r ? r.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, r) => {
      let s = e.specializers.find((o) => o.from == i.external);
      if (!s)
        return i;
      let l = Object.assign(Object.assign({}, i), { external: s.to });
      return t.specializers[r] = Qh(l), l;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /**
  @internal
  */
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let s of e.split(" ")) {
        let l = t.indexOf(s);
        l >= 0 && (i[l] = !0);
      }
    let r = null;
    for (let s = 0; s < t.length; s++)
      if (!i[s])
        for (let l = this.dialects[t[s]], o; (o = this.data[l++]) != 65535; )
          (r || (r = new Uint8Array(this.maxTerm + 1)))[o] = 1;
    return new Z1(e, i, r);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new Qi(e);
  }
}
function ct(n, e) {
  return n[e] | n[e + 1] << 16;
}
function C1(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function Qh(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
const A1 = 55, X1 = 1, R1 = 56, M1 = 2, L1 = 57, j1 = 3, bh = 4, E1 = 5, Qo = 6, _u = 7, Wu = 8, Bu = 9, Vu = 10, Y1 = 11, z1 = 12, _1 = 13, $s = 58, W1 = 14, B1 = 15, yh = 59, qu = 21, V1 = 23, Du = 24, q1 = 25, Xl = 27, Iu = 28, D1 = 29, I1 = 32, G1 = 35, N1 = 37, U1 = 38, F1 = 0, H1 = 1, K1 = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  command: !0,
  embed: !0,
  frame: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0,
  menuitem: !0
}, J1 = {
  dd: !0,
  li: !0,
  optgroup: !0,
  option: !0,
  p: !0,
  rp: !0,
  rt: !0,
  tbody: !0,
  td: !0,
  tfoot: !0,
  th: !0,
  tr: !0
}, kh = {
  dd: { dd: !0, dt: !0 },
  dt: { dd: !0, dt: !0 },
  li: { li: !0 },
  option: { option: !0, optgroup: !0 },
  optgroup: { optgroup: !0 },
  p: {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    dir: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    menu: !0,
    nav: !0,
    ol: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    ul: !0
  },
  rp: { rp: !0, rt: !0 },
  rt: { rp: !0, rt: !0 },
  tbody: { tbody: !0, tfoot: !0 },
  td: { td: !0, th: !0 },
  tfoot: { tbody: !0 },
  th: { td: !0, th: !0 },
  thead: { tbody: !0, tfoot: !0 },
  tr: { tr: !0 }
};
function eS(n) {
  return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161;
}
let xh = null, wh = null, $h = 0;
function Rl(n, e) {
  let t = n.pos + e;
  if ($h == t && wh == n) return xh;
  let i = n.peek(e), r = "";
  for (; eS(i); )
    r += String.fromCharCode(i), i = n.peek(++e);
  return wh = n, $h = t, xh = r ? r.toLowerCase() : i == tS || i == iS ? void 0 : null;
}
const Gu = 60, jr = 62, bo = 47, tS = 63, iS = 33, nS = 45;
function Ph(n, e) {
  this.name = n, this.parent = e;
}
const rS = [Qo, Vu, _u, Wu, Bu], sS = new zu({
  start: null,
  shift(n, e, t, i) {
    return rS.indexOf(e) > -1 ? new Ph(Rl(i, 1) || "", n) : n;
  },
  reduce(n, e) {
    return e == qu && n ? n.parent : n;
  },
  reuse(n, e, t, i) {
    let r = e.type.id;
    return r == Qo || r == N1 ? new Ph(Rl(i, 1) || "", n) : n;
  },
  strict: !1
}), lS = new Xe((n, e) => {
  if (n.next != Gu) {
    n.next < 0 && e.context && n.acceptToken($s);
    return;
  }
  n.advance();
  let t = n.next == bo;
  t && n.advance();
  let i = Rl(n, 0);
  if (i === void 0) return;
  if (!i) return n.acceptToken(t ? B1 : W1);
  let r = e.context ? e.context.name : null;
  if (t) {
    if (i == r) return n.acceptToken(Y1);
    if (r && J1[r]) return n.acceptToken($s, -2);
    if (e.dialectEnabled(F1)) return n.acceptToken(z1);
    for (let s = e.context; s; s = s.parent) if (s.name == i) return;
    n.acceptToken(_1);
  } else {
    if (i == "script") return n.acceptToken(_u);
    if (i == "style") return n.acceptToken(Wu);
    if (i == "textarea") return n.acceptToken(Bu);
    if (K1.hasOwnProperty(i)) return n.acceptToken(Vu);
    r && kh[r] && kh[r][i] ? n.acceptToken($s, -1) : n.acceptToken(Qo);
  }
}, { contextual: !0 }), oS = new Xe((n) => {
  for (let e = 0, t = 0; ; t++) {
    if (n.next < 0) {
      t && n.acceptToken(yh);
      break;
    }
    if (n.next == nS)
      e++;
    else if (n.next == jr && e >= 2) {
      t >= 3 && n.acceptToken(yh, -2);
      break;
    } else
      e = 0;
    n.advance();
  }
});
function aS(n) {
  for (; n; n = n.parent)
    if (n.name == "svg" || n.name == "math") return !0;
  return !1;
}
const hS = new Xe((n, e) => {
  if (n.next == bo && n.peek(1) == jr) {
    let t = e.dialectEnabled(H1) || aS(e.context);
    n.acceptToken(t ? E1 : bh, 2);
  } else n.next == jr && n.acceptToken(bh, 1);
});
function yo(n, e, t) {
  let i = 2 + n.length;
  return new Xe((r) => {
    for (let s = 0, l = 0, o = 0; ; o++) {
      if (r.next < 0) {
        o && r.acceptToken(e);
        break;
      }
      if (s == 0 && r.next == Gu || s == 1 && r.next == bo || s >= 2 && s < i && r.next == n.charCodeAt(s - 2))
        s++, l++;
      else if (s == i && r.next == jr) {
        o > l ? r.acceptToken(e, -l) : r.acceptToken(t, -(l - 2));
        break;
      } else if ((r.next == 10 || r.next == 13) && o) {
        r.acceptToken(e, 1);
        break;
      } else
        s = l = 0;
      r.advance();
    }
  });
}
const cS = yo("script", A1, X1), fS = yo("style", R1, M1), uS = yo("textarea", L1, j1), OS = Pi({
  "Text RawText IncompleteTag IncompleteCloseTag": m.content,
  "StartTag StartCloseTag SelfClosingEndTag EndTag": m.angleBracket,
  TagName: m.tagName,
  "MismatchedCloseTag/TagName": [m.tagName, m.invalid],
  AttributeName: m.attributeName,
  "AttributeValue UnquotedAttributeValue": m.attributeValue,
  Is: m.definitionOperator,
  "EntityReference CharacterReference": m.character,
  Comment: m.blockComment,
  ProcessingInst: m.processingInstruction,
  DoctypeDecl: m.documentMeta
}), dS = Qi.deserialize({
  version: 14,
  states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",
  stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",
  goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 68,
  context: sS,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 22, 31, 34, 37, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 30, 33, 36, 38, "OpenTag"],
    ["group", -10, 14, 15, 18, 19, 20, 21, 40, 41, 42, 43, "Entity", 17, "Entity TextContent", -3, 29, 32, 35, "TextContent Entity"],
    ["isolate", -11, 22, 30, 31, 33, 34, 36, 37, 38, 39, 42, 43, "ltr", -3, 27, 28, 40, ""]
  ],
  propSources: [OS],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [cS, fS, uS, hS, lS, oS, 0, 1, 2, 3, 4, 5],
  topRules: { Document: [0, 16] },
  dialects: { noMatch: 0, selfClosing: 515 },
  tokenPrec: 517
});
function Nu(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let i of n.getChildren(Du)) {
    let r = i.getChild(q1), s = i.getChild(Xl) || i.getChild(Iu);
    r && (t[e.read(r.from, r.to)] = s ? s.type.id == Xl ? e.read(s.from + 1, s.to - 1) : e.read(s.from, s.to) : "");
  }
  return t;
}
function vh(n, e) {
  let t = n.getChild(V1);
  return t ? e.read(t.from, t.to) : " ";
}
function Ps(n, e, t) {
  let i;
  for (let r of t)
    if (!r.attrs || r.attrs(i || (i = Nu(n.node.parent.firstChild, e))))
      return { parser: r.parser, bracketed: !0 };
  return null;
}
function Uu(n = [], e = []) {
  let t = [], i = [], r = [], s = [];
  for (let o of n)
    (o.tag == "script" ? t : o.tag == "style" ? i : o.tag == "textarea" ? r : s).push(o);
  let l = e.length ? /* @__PURE__ */ Object.create(null) : null;
  for (let o of e) (l[o.name] || (l[o.name] = [])).push(o);
  return Zf((o, a) => {
    let h = o.type.id;
    if (h == D1) return Ps(o, a, t);
    if (h == I1) return Ps(o, a, i);
    if (h == G1) return Ps(o, a, r);
    if (h == qu && s.length) {
      let c = o.node, f = c.firstChild, u = f && vh(f, a), O;
      if (u) {
        for (let d of s)
          if (d.tag == u && (!d.attrs || d.attrs(O || (O = Nu(f, a))))) {
            let p = c.lastChild, g = p.type.id == U1 ? p.from : c.to;
            if (g > f.to)
              return { parser: d.parser, overlay: [{ from: f.to, to: g }] };
          }
      }
    }
    if (l && h == Du) {
      let c = o.node, f;
      if (f = c.firstChild) {
        let u = l[a.read(f.from, f.to)];
        if (u) for (let O of u) {
          if (O.tagName && O.tagName != vh(c.parent, a)) continue;
          let d = c.lastChild;
          if (d.type.id == Xl) {
            let p = d.from + 1, g = d.lastChild, S = d.to - (g && g.isError ? 0 : 1);
            if (S > p) return { parser: O.parser, overlay: [{ from: p, to: S }], bracketed: !0 };
          } else if (d.type.id == Iu)
            return { parser: O.parser, overlay: [{ from: d.from, to: d.to }] };
        }
      }
    }
    return null;
  });
}
const pS = 148, Th = 1, gS = 149, mS = 150, Fu = 2, SS = 151, QS = 3, bS = 4, Hu = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], yS = 58, kS = 40, Ku = 95, xS = 91, ur = 45, wS = 46, $S = 35, PS = 37, vS = 38, TS = 92, ZS = 10, CS = 42;
function gn(n) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 161;
}
function ko(n) {
  return n >= 48 && n <= 57;
}
function Zh(n) {
  return ko(n) || n >= 97 && n <= 102 || n >= 65 && n <= 70;
}
const Ju = (n, e, t) => (i, r) => {
  for (let s = !1, l = 0, o = 0; ; o++) {
    let { next: a } = i;
    if (gn(a) || a == ur || a == Ku || s && ko(a))
      !s && (a != ur || o > 0) && (s = !0), l === o && a == ur && l++, i.advance();
    else if (a == TS && i.peek(1) != ZS) {
      if (i.advance(), Zh(i.next)) {
        do
          i.advance();
        while (Zh(i.next));
        i.next == 32 && i.advance();
      } else i.next > -1 && i.advance();
      s = !0;
    } else {
      s && i.acceptToken(
        l == 2 && r.canShift(Fu) ? e : a == kS ? t : n
      );
      break;
    }
  }
}, AS = new Xe(
  Ju(gS, Fu, mS),
  { contextual: !0 }
), XS = new Xe(
  Ju(SS, QS, bS),
  { contextual: !0 }
), RS = new Xe((n) => {
  if (Hu.includes(n.peek(-1))) {
    let { next: e } = n;
    (gn(e) || e == Ku || e == $S || e == wS || e == CS || e == xS || e == yS && gn(n.peek(1)) || e == ur || e == vS) && n.acceptToken(pS);
  }
}), MS = new Xe((n) => {
  if (!Hu.includes(n.peek(-1))) {
    let { next: e } = n;
    if (e == PS && (n.advance(), n.acceptToken(Th)), gn(e)) {
      do
        n.advance();
      while (gn(n.next) || ko(n.next));
      n.acceptToken(Th);
    }
  }
}), LS = Pi({
  "AtKeyword import charset namespace keyframes media supports font-feature-values": m.definitionKeyword,
  "from to selector scope MatchFlag": m.keyword,
  NamespaceName: m.namespace,
  KeyframeName: m.labelName,
  KeyframeRangeName: m.operatorKeyword,
  TagName: m.tagName,
  ClassName: m.className,
  PseudoClassName: m.constant(m.className),
  IdName: m.labelName,
  "FeatureName PropertyName": m.propertyName,
  AttributeName: m.attributeName,
  NumberLiteral: m.number,
  KeywordQuery: m.keyword,
  UnaryQueryOp: m.operatorKeyword,
  "CallTag ValueName FontName": m.atom,
  VariableName: m.variableName,
  Callee: m.operatorKeyword,
  Unit: m.unit,
  "UniversalSelector NestingSelector": m.definitionOperator,
  "MatchOp CompareOp": m.compareOperator,
  "ChildOp SiblingOp, LogicOp": m.logicOperator,
  BinOp: m.arithmeticOperator,
  Important: m.modifier,
  Comment: m.blockComment,
  ColorLiteral: m.color,
  "ParenthesizedContent StringLiteral": m.string,
  ":": m.punctuation,
  "PseudoOp #": m.derefOperator,
  "; , |": m.separator,
  "( )": m.paren,
  "[ ]": m.squareBracket,
  "{ }": m.brace
}), jS = { __proto__: null, lang: 44, "nth-child": 44, "nth-last-child": 44, "nth-of-type": 44, "nth-last-of-type": 44, dir: 44, "host-context": 44, if: 90, url: 158, "url-prefix": 158, domain: 158, regexp: 158 }, ES = { __proto__: null, or: 104, and: 104, not: 112, only: 112, layer: 212 }, YS = { __proto__: null, selector: 118, style: 124, layer: 208 }, zS = { __proto__: null, "@import": 204, "@media": 216, "@charset": 220, "@namespace": 224, "@keyframes": 230, "@supports": 242, "@scope": 246, "@font-feature-values": 252 }, _S = { __proto__: null, to: 249 }, WS = Qi.deserialize({
  version: 14,
  states: "MrQYQdOOO#}QdOOP$UO`OOO%OQaO'#CfOOQP'#Ce'#CeO%VQdO'#CgO%[Q`O'#CgO%aQaO'#FqO&XQdO'#CkO&xQaO'#CcO'SQdO'#CnO'_QdO'#ERO'dQdO'#ETO'oQdO'#E[O'oQdO'#E_OOQP'#Fq'#FqO)RQhO'#FQOOQS'#Fp'#FpOOQS'#FT'#FTQYQdOOO)YQdO'#EeO*iQhO'#EkO)YQdO'#EmO*pQdO'#EoO*{QdO'#ErO)}QhO'#ExO+TQdO'#EzO+`QdO'#E}O+eQaO'#CfO+lQ`O'#EbO+qQ`O'#F}O+|QdO'#F}QOQ`OOP,WO&jO'#CaPOOO)CA`)CA`OOQP'#Ci'#CiOOQP,59R,59RO%VQdO,59ROOQP'#Cm'#CmOOQP,59V,59VO&XQdO,59VO,cQdO,59YO'_QdO,5:mO'dQdO,5:oO'oQdO,5:vO'oQdO,5:xO'oQdO,5:yO'oQdO'#F[O,nQ`O,58}O,vQdO'#EaOOQS,58},58}OOQP'#Cq'#CqOOQO'#EP'#EPOOQP,59Y,59YO,}Q`O,59YO-SQ`O,59YOOQP'#ES'#ESOOQP,5:m,5:mO-XQpO'#EUO-dQdO'#EVO-iQ`O'#EVO-nQpO,5:oO.XQaO,5:vO.oQaO,5:yOOQW'#D^'#D^O/nQhO'#DgO0RQhO,5;lO)}QhO'#DeO0`Q`O'#DnO0eQhO'#D{OOQW'#Fw'#FwOOQS,5;l,5;lO0jQ`O'#DhO0oQ`O'#DkOOQS-E9R-E9ROOQ['#Cv'#CvO0tQdO'#CwO1[QdO'#C}O1rQdO'#DQO2YQ!pO'#DSO4fQ!jO,5;POOQO'#DX'#DXO-SQ`O'#DWO4vQ!nO'#FtO6|Q`O'#DYO7RQ`O'#D|OOQ['#Ft'#FtO7WQhO'#GQO7fQ`O,5;VO7kQ!bO,5;XOOQS'#Eq'#EqO7sQ`O,5;ZO7xQdO,5;ZOOQO'#Et'#EtO8QQ`O,5;^O8VQhO,5;dO'oQdO'#DjOOQS,5;f,5;fO0jQ`O,5;fO8_QdO,5;fOOQS'#Fc'#FcO8gQdO'#FPO7fQ`O,5;iO8oQdO,5:|O9PQdO'#F^O9^Q`O,5<iO9^Q`O,5<iPOOO'#FS'#FSP9iO&jO,58{POOO,58{,58{OOQP1G.m1G.mOOQP1G.q1G.qOOQP1G.t1G.tO,}Q`O1G.tO-SQ`O1G.tOOQP1G0X1G0XO9tQpO1G0ZO9|QaO1G0bO:dQaO1G0dO:zQaO1G0eO;bQaO,5;vOOQO-E9Y-E9YOOQS1G.i1G.iO;lQ`O,5:{O;qQdO'#EQO;xQdO'#CuOOQO'#EX'#EXOOQO,5:q,5:qO-dQdO,5:qOOQP1G0Z1G0ZO)YQdO1G0ZO<PQ!jO'#D^O<_Q!bO,59yO<gQhO,5:ROOQO'#Fx'#FxO<bQ!bO,59}O<oQhO'#FdO)}QhO,59{O)}QhO'#FdO=gQhO1G1WOOQS1G1W1G1WO=qQhO,5:PO>lQhO'#DoOOQW,5:Y,5:YOOQW,5:g,5:gOOQW,5:S,5:SO>vQhO,5:VO?bQ!fO'#FuOOQS'#Fu'#FuOOQS'#FV'#FVO@rQdO,59cOOQ[,59c,59cOAYQdO,59iOOQ[,59i,59iOApQdO,59lOOQ[,59l,59lOOQ[,59n,59nO)YQdO,59pOBWQhO'#EgOOQW'#Eg'#EgOBuQ`O1G0kO4oQhO1G0kOOQ[,59r,59rO)}QhO'#D[OOQ[,59t,59tOBzQ#tO,5:hOCVQhO'#F`OCdQ`O,5<lOOQS1G0q1G0qOOQS1G0s1G0sOOQS1G0u1G0uOCoQ`O1G0uOCtQdO'#EuOOQS1G0x1G0xOOQS1G1O1G1OODPQaO,5:UO7fQ`O1G1QOOQS1G1Q1G1QO0jQ`O1G1QOOQS-E9a-E9aOOQS1G1T1G1TODWQ!fO1G0hODnQ`O'#EdOOQO1G0h1G0hOOQO,5;x,5;xODsQdO,5;xOOQO-E9[-E9[OEQQ`O1G2TPOOO-E9Q-E9QPOOO1G.g1G.gOOQP7+$`7+$`OOQP7+%u7+%uO)YQdO7+%uOOQS1G0g1G0gOE]QaO'#F|OEgQ`O,5:lOElQ!fO'#FUOFjQdO'#FsOFtQ`O,59aOOQO1G0]1G0]OFyQ!bO7+%uO)YQdO1G/eOGUQhO1G/iOOQW1G/m1G/mOOQW1G/g1G/gOGgQhO,5<OOOQW-E9b-E9bOOQS7+&r7+&rOH_QhO'#D^OHmQhO'#F{OHxQ`O'#F{OH}Q`O,5:ZOISQ!bO'#D`O>vQhO'#DmOI_QhO'#DsOIgQhO'#DuOIlQ!jO'#FzOOQO'#Fz'#FzOIwQ`O'#DxOJPQ!bO'#DzOOQO'#Fy'#FyOJUQ`O1G/qOOQS-E9T-E9TOOQ[1G.}1G.}OOQ[1G/T1G/TOOQ[1G/W1G/WOOQ[1G/[1G/[OJZQdO,5;ROOQS7+&V7+&VOJ`Q`O7+&VOJeQhO'#D]OJmQ`O,59vO)}QhO,59vOOQ[1G0S1G0SOJuQ`O1G0SOJzQhO,5;zOOQO-E9^-E9^OOQS7+&a7+&aOKYQbO'#DSOOQO'#Ew'#EwOKhQ`O'#EvOOQO'#Ev'#EvOKsQ`O'#FaOK{QdO,5;aOOQS,5;a,5;aOOQ[1G/p1G/pOOQS7+&l7+&lO7fQ`O7+&lOLWQ!fO'#F]O)YQdO'#F]OM_QdO7+&SOOQO7+&S7+&SOOQO,5;O,5;OOOQO1G1d1G1dOMrQ!bO<<IaOM}QdO'#FZONXQ`O,5<hOOQP1G0W1G0WOOQS-E9S-E9SONaQdO'#FYONkQ`O,5<_OOQ]1G.{1G.{OOQP<<Ia<<IaONsQ`O<<IaONxQdO7+%POOQO'#D`'#D`O! PQ!bO7+%TO! XQhO'#FXO! fQ`O,5<gO)YQdO,5<gOOQW1G/u1G/uO! nQ`O,5:XO>vQhO'#DtOOQO,5:_,5:_O! sQhO,5:aO! {QhO,5:fO)YQdO,5:dOOQW7+%]7+%]OOQO'#Ei'#EiO!!SQ`O1G0mOOQS<<Iq<<IqO)YQdO,59wO!!vQhO1G/bOOQ[1G/b1G/bO!!}Q`O1G/bOOQW-E9U-E9UOOQ[7+%n7+%nOOQO,5;b,5;bOCwQdO'#FbOKsQ`O,5;{OOQS,5;{,5;{OOQS-E9_-E9_OOQS1G0{1G0{OOQS<<JW<<JWO!#VQ!fO,5;wOOQS-E9Z-E9ZOOQO<<In<<InOOQPAN>{AN>{O!$^Q`OAN>{O!$cQaO,5;uOOQO-E9X-E9XO!$mQdO,5;tOOQO-E9W-E9WOOQW<<Hk<<HkOOQW<<Ho<<HoO!$wQhO<<HoO!%YQhO'#D^O!%hQhO,5;sO!%sQ`O,5;sOOQO-E9V-E9VO!%xQdO1G2RO!&SQhO1G/sO!&[Q`O,5:`O>vQhO'#DwOOQO1G/{1G/{O!&aQ!bO1G0QO!&iQdO1G0OOJZQdO'#F_O!&pQ`O7+&XOOQW7+&X7+&XO!&xQ!bO1G/cOOQ[7+$|7+$|O!'TQhO7+$|P!'[Q`O'#FWOOQO,5;|,5;|OOQO-E9`-E9`OOQS1G1g1G1gOOQPG24gG24gO!'aQ`OAN>ZO)YQdO1G1_O!'fQ`O7+'mOOQO1G/z1G/zO!'nQ`O,5:cO!'sQhO7+%lOOQO,5;y,5;yOOQO-E9]-E9]OOQW<<Is<<IsOOQ[<<Hh<<HhPOQW,5;r,5;rOOQWG23uG23uO!'zQdO7+&yOOQO1G/}1G/}OOQO<<IW<<IW",
  stateData: "!(_~O$_OS$`QQ~OWVO^_O`WOcYOdYOl`OmZOp[O#P]O#S^O#YdO#`eO#bfO#dgO#ghO#miO#ojO#rkO$ZRO$fTO~OQmOWVO^_O`WOcYOdYOl`OmZOp[O#P]O#S^O#YdO#`eO#bfO#dgO#ghO#miO#ojO#rkO$ZlO$fTO~O$X$qP~P!jO$`qO~O`YXcYXdYXmYXpYXsYX!eYX#PYX#SYX$YYX$f[X~OgYX~P$ZO$ZsO~O$fuO~O$fuO`$eXc$eXd$eXm$eXp$eXs$eX!e$eX#P$eX#S$eX$Y$eXg$eX~O$ZvO~O`xOcyOdyOmzOp{O#P|O#S!OO$Y}O~Os!RO!e!PO~P&^Of!XO$Z!TO$[!UO~O$Z!YO~OW!^O$Z![O$f!]O~OWVO^_O`WOcYOdYOmZOp[O#P]O#S^O$ZRO$fTO~OS!fOc!gOd!gOh!cOs!RO!Y!eO!]!jO!`!kO$]!bO~On!iO~P(dOQ!uOh!nOp!oOs!pOu!xOw!xO}!vO!q!wO$Z!mO$[!sO$j!qO~OS!fOc!gOd!gOh!cO!Y!eO!]!jO!`!kO$]!bO~Os$tP~P)}Ow!}O!q!wO$Z!|O~Ow#PO$Z#PO~Oh#SOs!RO#p#UO~O$Z#WO~Oc#VX~P$ZOc#ZO~On#[O$X$qXr$qX~O$X$qXr$qX~P!jO$a#_O$b#_O$c#aO~Of#fO$Z!TO$[!UO~Os!RO!e!PO~Or$qP~P!jOh#pO~Oh#qO~Oo!xX!|!xX$f!zX~O$Z#rO~O$f#tO~Oo#uO!|#vO~O`xOcyOdyOmzOp{O~Os#Oa!e#Oa#P#Oa#S#Oa$Y#Oag#Oa~P-vOs#Ra!e#Ra#P#Ra#S#Ra$Y#Rag#Ra~P-vOS!fOc!gOd!gOh!cO!Y!eO!]!jO!`!kO~OR#zOu#zOw#zO$]#wO$j!qO~P/VOn$QO!U#}O!e$OO~P(dOh$SO~O$]$UO~Oh#SO~Oh$WO~O`$YOc$YOg$]Ol$YOm$YOn$YO~P)YO`$YOc$YOl$YOm$YOn$YOo$_O~P)YO`$YOc$YOl$YOm$YOn$YOr$aO~P)YOP$bOSvXcvXdvXhvXnvXyvX!YvX!]vX!`vX#[vX#^vX$]vX!WvXQvX`vXgvXlvXmvXpvXsvXuvXwvX}vX!qvX$ZvX$[vX$jvXovXrvX!evX$XvX$svX!}vX~Oy$cO#[$dO#^$eOn$tP~P)}Oh#qOS$hXc$hXd$hXn$hXy$hX!Y$hX!]$hX!`$hX#[$hX#^$hX$]$hXQ$hX`$hXg$hXl$hXm$hXp$hXs$hXu$hXw$hX}$hX!q$hX$Z$hX$[$hX$j$hXo$hXr$hX!e$hX$X$hX$s$hX!}$hX~Oh$iO~Oh$kO~O!U#}O!e$lOs$tXn$tX~Os!RO~On$oOy$cO~On$pO~Ow$qO!q!wO~Os$rO~Os!RO!U#}O~Os!RO#p$xO~O$Z#WOs#sX~O$s$|On#Ua$X#Uar#Ua~P)YOn$QX$X$QXr$QX~P!jOn#[O$X$qar$qa~O$a#_O$b#_O$c%TO~Oo%VO!|%WO~Os#Oi!e#Oi#P#Oi#S#Oi$Y#Oig#Oi~P-vOs#Qi!e#Qi#P#Qi#S#Qi$Y#Qig#Qi~P-vOs#Ri!e#Ri#P#Ri#S#Ri$Y#Rig#Ri~P-vOs$Oa!e$Oa~P&^Or%XO~Og$pP~P'oOg$gP~P)YOc!SXg!QX!U!QX!W!SX~Oc%aO!W%bO~Og%cO!U#}O~O!U#}OS$WXc$WXd$WXh$WXn$WXs$WX!Y$WX!]$WX!`$WX!e$WX$]$WX~On%gO!e$OO~P(dO!U#}OS!Xac!Xad!Xah!Xan!Xas!Xa!Y!Xa!]!Xa!`!Xa!e!Xa$]!Xag!Xa~O$]%hOg$oP~P/VOR#zOS!fOh%mOu#zOw#zO!Y%nO$]%lO$j!qO~Oy$cOQ$iX`$iXc$iXg$iXh$iXl$iXm$iXn$iXp$iXs$iXu$iXw$iX}$iX!q$iX$Z$iX$[$iX$j$iXo$iXr$iX~O`$YOc$YOg%wOl$YOm$YOn$YO~P)YO`$YOc$YOl$YOm$YOn$YOo%xO~P)YO`$YOc$YOl$YOm$YOn$YOr%yO~P)YOh%{OS#ZXc#ZXd#ZXn#ZX!Y#ZX!]#ZX!`#ZX$]#ZX~On%|O~Og&ROw&SO!r&SO~Os$SX!e$SXn$SX~P)}O!e$lOs$tan$ta~On&VO~Or&^O$Z&XO$j&WO~Og&_O~P&^Oy$cO!e&cO$s$|On#Ui$X#Uir#Ui~P)YO$r&fO~On$Qa$X$Qar$Qa~P!jOn#[O$X$qir$qi~O!e&iOg$pX~P&^Og&kO~Oy$cOQ#xXg#xXh#xXp#xXs#xXu#xXw#xX}#xX!e#xX!q#xX$Z#xX$[#xX$j#xX~O!e&mOg$gX~P)YOg&oO~Oo&pOy$cO!}&qO~OR#zOu#zOw#zO$]&sO$j!qO~O!U#}OS$Wac$Wad$Wah$Wan$Was$Wa!Y$Wa!]$Wa!`$Wa!e$Wa$]$Wa~Oc!dXg!QX!U!QX!e!QX~O!U#}O!e&uOg$oX~Oc&wO~Og&xO~Oc!mXg!mX!W!SX~OS!fOh&zO~O!U&|O~O!U&|O!W&}Og$nX~Oc'OOg!lX~O!W&}O~Og'PO~O$Z'QO~On'SO~Oc'TO!U#}O~Og'VOn'UO~Og'YO~O!U#}Os$Sa!e$San$Sa~OP$bOsvX!evXgvX~O$j&WOs#jX!e#jX~Os!RO!e'[O~Or'`O$Z&XO$j&WO~Oy$cOQ$PXh$PXn$PXp$PXs$PXu$PXw$PX}$PX!e$PX!q$PX$X$PX$Z$PX$[$PX$j$PX$s$PXr$PX~O!e&cO$s$|On#Uq$X#Uqr#Uq~P)YOo'eOy$cO!}'fO~Og#}X!e#}X~P'oO!e&iOg$pa~Og#|X!e#|X~P)YO!e&mOg$ga~Oo'eO~Og'kO~P)YOg'lO!W'mO~O$]'nOg#{X!e#{X~P/VO!e&uOg$oa~Og'sO~OS!fOh'uO~OS!fO~PGUO`'yOg'{O~OS#zac#zad#zah#za!Y#za!]#za!`#za$]#za~Og'}O~P!![Og'}On(OO~Oy$cOQ$Pah$Pan$Pap$Pas$Pau$Paw$Pa}$Pa!e$Pa!q$Pa$X$Pa$Z$Pa$[$Pa$j$Pa$s$Par$Pa~Oo(TO~Og#}a!e#}a~P&^Og#|a!e#|a~P)YOR#zOu#zOw#zO$]&sO$j&WO~Oc!fXg!QX!U!QX!e!QX~O!U#}Og#{a!e#{a~Oc(VO~O!e&uOg$oi~P)YOg!ai!U!ji~Og(XO~O!W(ZOg!ni~Og!li~P)YO`'yOg(^O~Oy$cOg!Pin!Pi~Og(_O~P!![On(`O~Og(aO~O!e&uOg$oq~Og(cO~OS!fO~P!$wOg#{q!e#{q~P)YO$_!r$`$j`$jy#S~",
  goto: "7g$uPPPPP$vP$yP%S%f%S%x&[P%SP&b%SPP&hPPP&n&x&xPPPPP&xPP&xP'hP&xP&x(k&xP)Z)^)d)d)v)dP)dP)dP)d)dP*])dP*i*o+e+hP+k*i+n*i+q+w+z,Q+z)d,WPP,|-S%S-Y%S-`-`-f-jPP%SP%S%SP-p.l.y/Q$yP/ZP/^P$yP$yP$yP/d$yP/g/j/m/t$yP$yPP$yP/y$yP/|0S0c0}1]1c1m1s1y2P2V2a2g2m2s2y3PPPPPPPPPPPP3V3`P4U4X5]P5e6_6t+z7Q7T7WPP7^RrQ_aOPco!R#[%Pq_OP]^co|}!O!P!R#S#[#p%P&iqSOP]^co|}!O!P!R#S#[#p%P&iqUOP]^co|}!O!P!R#S#[#p%P&iQtTR#buQwWR#cxQ!VYR#dyQ#d!XS$h!t!uR%U#f!Z!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(b!Y!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bb#z!c$W%b%m&z&}'m'u(ZU&Z$r&]'[R'Z&Y!Z!tdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bR$j!vQ&P$iR'W&Qq!h`ei!c!d!e!r#}$O$P$S$g$i$l&Q&uQ#x!cW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(ZQ#VjQ$V!jQ$v#UR&a$xX%q$W%m&z'up!h`ei!c!d!e!r#}$O$P$S$g$i$l&Q&uW%p$W%m&z'uQ&{%nQ'v&|Q'w&}R(d(ZR$T!fR%j$SR'p&uR&{%nX%o$W%m&z'uR'v&|X%t$W%m&z'uX%r$W%m&z'u!Y!xdf!n!o!p#Z#q#v$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bQ!}gR$q#OQ!WYR#eyQ#d!WR%U#eQ!ZZR#gzQ!_[R#h{T!^[{Q#s!]R%_#tQ!SXQ!i`Q#TjQ#n!QQ$Q!dQ$n!zQ$t#RQ$w#VQ$z#YQ%g$PQ&`$vQ'^&[Q'a&aR(S']SnP!RQ#^oQ%O#[R&g%PZmPo!R#[%PQ$}#ZQ&e${R'd&dR$g!rQ'R%{R(['yR#OgR#QhR$s#QS&[$r&]R(Q'[V&Y$r&]'[R#YkQ#`qR%S#`QcOSoP!RU!lco%PR%P#[Q%]#q[&l%]&r'i'r'x(bQ&r%aQ'i&mQ'r&wQ'x'OR(b(VQ$[!nQ$^!oQ$`!pV%v$[$^$`Q&Q$iR'X&QQ&v%iS'q&v(WR(W'rQ&n%]R'j&nQ&j%YR'h&jQ!QXR#m!QQ&d${R'c&dQ#]nS%Q#]%RR%R#^Q'z'RR(]'zQ$m!yR&U$mQ&]$rR'_&]Q']&[R(R']Q#XkR$y#XQ$P!dR%f$P_bOPco!R#[%P^XOPco!R#[%PQ!`]Q!a^Q#i|Q#j}Q#k!OQ#l!PQ$u#SQ%Y#pR'g&iR%^#qQ!rdQ!{f[$X!n!o!p$[$^$`Q${#Zh%[#q%]%a&m&r&w'O'i'r'x(V(bQ%`#vQ%z$cS&b${&dQ&h%WQ'b&cR'|'T]$Z!n!o!p$[$^$`Q!d`U!ye!r$gQ#RiQ#y!cS#|!d$PQ$R!eQ%d#}Q%e$OQ%i$SS&O$i&QQ&T$lR'o&uQ#{!cW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(ZQ%u$WQ&y%mQ't&zR(Y'uR%k$SR%Z#pQpPR#o!RQ!zeQ$f!rR%}$g",
  nodeNames: "⚠ Unit VariableName VariableName QueryCallee Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NamespacedTagSelector NamespaceName TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue AtKeyword # ; ] [ BracketedValue } { BracedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee IfExpression if ArgList IfBranch KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector ParenthesizedSelector StyleQuery style ParenthesedQuery CallQuery ArgList PropertyName , PropertyName UnaryQuery ParenthesedQuery BinaryQuery ParenthesedQuery ParenthesedQuery StyleFeature PropertyName StyleRange PseudoQuery CallLiteral CallTag ParenthesizedContent PseudoClassName ArgList IdSelector IdName AttributeSelector AttributeName NamespacedAttribute NamespaceName AttributeName MatchOp MatchFlag ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp Block Declaration PropertyName Important ImportStatement import Layer layer LayerName layer MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports ScopeStatement scope to FontFeatureStatement font-feature-values FontName AtRule Styles",
  maxTerm: 174,
  nodeProps: [
    ["isolate", -2, 5, 39, ""],
    ["openedBy", 23, "(", 31, "[", 34, "{"],
    ["closedBy", 24, ")", 32, "]", 35, "}"]
  ],
  propSources: [LS],
  skippedNodes: [0, 5, 130],
  repeatNodeCount: 17,
  tokenData: "K`~R!bOX%ZX^&R^p%Zpq&Rqr)ers)vst+jtu2Xuv%Zvw3Rwx3dxy5Ryz5dz{5i{|6S|}:u}!O;W!O!P;u!P!Q<^!Q![=V![!]>Q!]!^>|!^!_?_!_!`@Z!`!a@n!a!b%Z!b!cAo!c!k%Z!k!lC|!l!u%Z!u!vC|!v!}%Z!}#OD_#O#P%Z#P#QDp#Q#R2X#R#]%Z#]#^ER#^#g%Z#g#hC|#h#o%Z#o#pIf#p#qIw#q#rJ`#r#sJq#s#y%Z#y#z&R#z$f%Z$f$g&R$g#BY%Z#BY#BZ&R#BZ$IS%Z$IS$I_&R$I_$I|%Z$I|$JO&R$JO$JT%Z$JT$JU&R$JU$KV%Z$KV$KW&R$KW&FU%Z&FU&FV&R&FV;'S%Z;'S;=`KY<%lO%Z`%^SOy%jz;'S%j;'S;=`%{<%lO%j`%oS!r`Oy%jz;'S%j;'S;=`%{<%lO%j`&OP;=`<%l%j~&Wh$_~OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%j~'yh$_~!r`OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%jj)jS$sYOy%jz;'S%j;'S;=`%{<%lO%j~)yWOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d<%lO)v~*hOw~~*kRO;'S)v;'S;=`*t;=`O)v~*wXOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d;=`<%l)v<%lO)v~+gP;=`<%l)vj+oYmYOy%jz!Q%j!Q![,_![!c%j!c!i,_!i#T%j#T#Z,_#Z;'S%j;'S;=`%{<%lO%jj,dY!r`Oy%jz!Q%j!Q![-S![!c%j!c!i-S!i#T%j#T#Z-S#Z;'S%j;'S;=`%{<%lO%jj-XY!r`Oy%jz!Q%j!Q![-w![!c%j!c!i-w!i#T%j#T#Z-w#Z;'S%j;'S;=`%{<%lO%jj.OYuY!r`Oy%jz!Q%j!Q![.n![!c%j!c!i.n!i#T%j#T#Z.n#Z;'S%j;'S;=`%{<%lO%jj.uYuY!r`Oy%jz!Q%j!Q![/e![!c%j!c!i/e!i#T%j#T#Z/e#Z;'S%j;'S;=`%{<%lO%jj/jY!r`Oy%jz!Q%j!Q![0Y![!c%j!c!i0Y!i#T%j#T#Z0Y#Z;'S%j;'S;=`%{<%lO%jj0aYuY!r`Oy%jz!Q%j!Q![1P![!c%j!c!i1P!i#T%j#T#Z1P#Z;'S%j;'S;=`%{<%lO%jj1UY!r`Oy%jz!Q%j!Q![1t![!c%j!c!i1t!i#T%j#T#Z1t#Z;'S%j;'S;=`%{<%lO%jj1{SuY!r`Oy%jz;'S%j;'S;=`%{<%lO%jd2[UOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jd2uS!|S!r`Oy%jz;'S%j;'S;=`%{<%lO%jb3WS^QOy%jz;'S%j;'S;=`%{<%lO%j~3gWOY3dZw3dwx*cx#O3d#O#P4P#P;'S3d;'S;=`4{<%lO3d~4SRO;'S3d;'S;=`4];=`O3d~4`XOY3dZw3dwx*cx#O3d#O#P4P#P;'S3d;'S;=`4{;=`<%l3d<%lO3d~5OP;=`<%l3dj5WShYOy%jz;'S%j;'S;=`%{<%lO%j~5iOg~n5pUWQyWOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jj6ZWyW#SQOy%jz!O%j!O!P6s!P!Q%j!Q![9x![;'S%j;'S;=`%{<%lO%jj6xU!r`Oy%jz!Q%j!Q![7[![;'S%j;'S;=`%{<%lO%jj7cY!r`$jYOy%jz!Q%j!Q![7[![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj8WY!r`Oy%jz{%j{|8v|}%j}!O8v!O!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj8{U!r`Oy%jz!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj9fU!r`$jYOy%jz!Q%j!Q![9_![;'S%j;'S;=`%{<%lO%jj:P[!r`$jYOy%jz!O%j!O!P7[!P!Q%j!Q![9x![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj:zS!eYOy%jz;'S%j;'S;=`%{<%lO%jj;]WyWOy%jz!O%j!O!P6s!P!Q%j!Q![9x![;'S%j;'S;=`%{<%lO%jj;zU`YOy%jz!Q%j!Q![7[![;'S%j;'S;=`%{<%lO%j~<cTyWOy%jz{<r{;'S%j;'S;=`%{<%lO%j~<yS!r`$`~Oy%jz;'S%j;'S;=`%{<%lO%jj=[[$jYOy%jz!O%j!O!P7[!P!Q%j!Q![9x![!g%j!g!h8R!h#X%j#X#Y8R#Y;'S%j;'S;=`%{<%lO%jj>VUcYOy%jz![%j![!]>i!];'S%j;'S;=`%{<%lO%jj>pSdY!r`Oy%jz;'S%j;'S;=`%{<%lO%jj?RSnYOy%jz;'S%j;'S;=`%{<%lO%jh?dU!WWOy%jz!_%j!_!`?v!`;'S%j;'S;=`%{<%lO%jh?}S!WW!r`Oy%jz;'S%j;'S;=`%{<%lO%jl@bS!WW!|SOy%jz;'S%j;'S;=`%{<%lO%jj@uV#PQ!WWOy%jz!_%j!_!`?v!`!aA[!a;'S%j;'S;=`%{<%lO%jbAcS#PQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjArYOy%jz}%j}!OBb!O!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jjBgW!r`Oy%jz!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jjCW[lY!r`Oy%jz}%j}!OCP!O!Q%j!Q![CP![!c%j!c!}CP!}#T%j#T#oCP#o;'S%j;'S;=`%{<%lO%jhDRS!}WOy%jz;'S%j;'S;=`%{<%lO%jjDdSpYOy%jz;'S%j;'S;=`%{<%lO%jnDuSo^Oy%jz;'S%j;'S;=`%{<%lO%jjEWU!}WOy%jz#a%j#a#bEj#b;'S%j;'S;=`%{<%lO%jbEoU!r`Oy%jz#d%j#d#eFR#e;'S%j;'S;=`%{<%lO%jbFWU!r`Oy%jz#c%j#c#dFj#d;'S%j;'S;=`%{<%lO%jbFoU!r`Oy%jz#f%j#f#gGR#g;'S%j;'S;=`%{<%lO%jbGWU!r`Oy%jz#h%j#h#iGj#i;'S%j;'S;=`%{<%lO%jbGoU!r`Oy%jz#T%j#T#UHR#U;'S%j;'S;=`%{<%lO%jbHWU!r`Oy%jz#b%j#b#cHj#c;'S%j;'S;=`%{<%lO%jbHoU!r`Oy%jz#h%j#h#iIR#i;'S%j;'S;=`%{<%lO%jbIYS$rQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjIkSsYOy%jz;'S%j;'S;=`%{<%lO%jfI|U$fUOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%jjJeSrYOy%jz;'S%j;'S;=`%{<%lO%jfJvU#SQOy%jz!_%j!_!`2n!`;'S%j;'S;=`%{<%lO%j`K]P;=`<%l%Z",
  tokenizers: [RS, MS, AS, XS, 1, 2, 3, 4, new Lr("m~RRYZ[z{a~~g~aO$b~~dP!P!Qg~lO$c~~", 28, 155)],
  topRules: { StyleSheet: [0, 6], Styles: [1, 129] },
  dynamicPrecedences: { 97: 1 },
  specialized: [{ term: 150, get: (n) => jS[n] || -1 }, { term: 151, get: (n) => ES[n] || -1 }, { term: 4, get: (n) => YS[n] || -1 }, { term: 28, get: (n) => zS[n] || -1 }, { term: 149, get: (n) => _S[n] || -1 }],
  tokenPrec: 2444
});
let vs = null;
function Ts() {
  if (!vs && typeof document == "object" && document.body) {
    let { style: n } = document.body, e = [], t = /* @__PURE__ */ new Set();
    for (let i in n)
      i != "cssText" && i != "cssFloat" && typeof n[i] == "string" && (/[A-Z]/.test(i) && (i = i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase())), t.has(i) || (e.push(i), t.add(i)));
    vs = e.sort().map((i) => ({ type: "property", label: i, apply: i + ": " }));
  }
  return vs || [];
}
const Ch = /* @__PURE__ */ [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((n) => ({ type: "class", label: n })), Ah = /* @__PURE__ */ [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((n) => ({ type: "keyword", label: n })).concat(/* @__PURE__ */ [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((n) => ({ type: "constant", label: n }))), BS = /* @__PURE__ */ [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((n) => ({ type: "type", label: n })), VS = /* @__PURE__ */ [
  "@charset",
  "@color-profile",
  "@container",
  "@counter-style",
  "@font-face",
  "@font-feature-values",
  "@font-palette-values",
  "@import",
  "@keyframes",
  "@layer",
  "@media",
  "@namespace",
  "@page",
  "@position-try",
  "@property",
  "@scope",
  "@starting-style",
  "@supports",
  "@view-transition"
].map((n) => ({ type: "keyword", label: n })), ht = /^(\w[\w-]*|-\w[\w-]*|)$/, qS = /^-(-[\w-]*)?$/;
function DS(n, e) {
  var t;
  if ((n.name == "(" || n.type.isError) && (n = n.parent || n), n.name != "ArgList")
    return !1;
  let i = (t = n.parent) === null || t === void 0 ? void 0 : t.firstChild;
  return (i == null ? void 0 : i.name) != "Callee" ? !1 : e.sliceString(i.from, i.to) == "var";
}
const Xh = /* @__PURE__ */ new Tf(), IS = ["Declaration"];
function GS(n) {
  for (let e = n; ; ) {
    if (e.type.isTop)
      return e;
    if (!(e = e.parent))
      return n;
  }
}
function eO(n, e, t) {
  if (e.to - e.from > 4096) {
    let i = Xh.get(e);
    if (i)
      return i;
    let r = [], s = /* @__PURE__ */ new Set(), l = e.cursor(W.IncludeAnonymous);
    if (l.firstChild())
      do
        for (let o of eO(n, l.node, t))
          s.has(o.label) || (s.add(o.label), r.push(o));
      while (l.nextSibling());
    return Xh.set(e, r), r;
  } else {
    let i = [], r = /* @__PURE__ */ new Set();
    return e.cursor().iterate((s) => {
      var l;
      if (t(s) && s.matchContext(IS) && ((l = s.node.nextSibling) === null || l === void 0 ? void 0 : l.name) == ":") {
        let o = n.sliceString(s.from, s.to);
        r.has(o) || (r.add(o), i.push({ label: o, type: "variable" }));
      }
    }), i;
  }
}
const NS = (n) => (e) => {
  let { state: t, pos: i } = e, r = re(t).resolveInner(i, -1), s = r.type.isError && r.from == r.to - 1 && t.doc.sliceString(r.from, r.to) == "-";
  if (r.name == "PropertyName" || (s || r.name == "TagName") && /^(Block|Styles)$/.test(r.resolve(r.to).name))
    return { from: r.from, options: Ts(), validFor: ht };
  if (r.name == "ValueName")
    return { from: r.from, options: Ah, validFor: ht };
  if (r.name == "PseudoClassName")
    return { from: r.from, options: Ch, validFor: ht };
  if (n(r) || (e.explicit || s) && DS(r, t.doc))
    return {
      from: n(r) || s ? r.from : i,
      options: eO(t.doc, GS(r), n),
      validFor: qS
    };
  if (r.name == "TagName") {
    for (let { parent: a } = r; a; a = a.parent)
      if (a.name == "Block")
        return { from: r.from, options: Ts(), validFor: ht };
    return { from: r.from, options: BS, validFor: ht };
  }
  if (r.name == "AtKeyword")
    return { from: r.from, options: VS, validFor: ht };
  if (!e.explicit)
    return null;
  let l = r.resolve(i), o = l.childBefore(i);
  return o && o.name == ":" && l.name == "PseudoClassSelector" ? { from: i, options: Ch, validFor: ht } : o && o.name == ":" && l.name == "Declaration" || l.name == "ArgList" ? { from: i, options: Ah, validFor: ht } : l.name == "Block" || l.name == "Styles" ? { from: i, options: Ts(), validFor: ht } : null;
}, US = /* @__PURE__ */ NS((n) => n.name == "VariableName"), Er = /* @__PURE__ */ gi.define({
  name: "css",
  parser: /* @__PURE__ */ WS.configure({
    props: [
      /* @__PURE__ */ Pn.add({
        Declaration: /* @__PURE__ */ cr()
      }),
      /* @__PURE__ */ vn.add({
        "Block KeyframeList": Lf
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function FS() {
  return new un(Er, Er.data.of({ autocomplete: US }));
}
const HS = 316, KS = 317, Rh = 1, JS = 2, eQ = 3, tQ = 4, iQ = 318, nQ = 320, rQ = 321, sQ = 5, lQ = 6, oQ = 0, Ml = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], tO = 125, aQ = 59, Ll = 47, hQ = 42, cQ = 43, fQ = 45, uQ = 60, OQ = 44, dQ = 63, pQ = 46, gQ = 91, mQ = new zu({
  start: !1,
  shift(n, e) {
    return e == sQ || e == lQ || e == nQ ? n : e == rQ;
  },
  strict: !1
}), SQ = new Xe((n, e) => {
  let { next: t } = n;
  (t == tO || t == -1 || e.context) && n.acceptToken(iQ);
}, { contextual: !0, fallback: !0 }), QQ = new Xe((n, e) => {
  let { next: t } = n, i;
  Ml.indexOf(t) > -1 || t == Ll && ((i = n.peek(1)) == Ll || i == hQ) || t != tO && t != aQ && t != -1 && !e.context && n.acceptToken(HS);
}, { contextual: !0 }), bQ = new Xe((n, e) => {
  n.next == gQ && !e.context && n.acceptToken(KS);
}, { contextual: !0 }), yQ = new Xe((n, e) => {
  let { next: t } = n;
  if (t == cQ || t == fQ) {
    if (n.advance(), t == n.next) {
      n.advance();
      let i = !e.context && e.canShift(Rh);
      n.acceptToken(i ? Rh : JS);
    }
  } else t == dQ && n.peek(1) == pQ && (n.advance(), n.advance(), (n.next < 48 || n.next > 57) && n.acceptToken(eQ));
}, { contextual: !0 });
function Zs(n, e) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n == 95 || n >= 192 || !e && n >= 48 && n <= 57;
}
const kQ = new Xe((n, e) => {
  if (n.next != uQ || !e.dialectEnabled(oQ) || (n.advance(), n.next == Ll)) return;
  let t = 0;
  for (; Ml.indexOf(n.next) > -1; )
    n.advance(), t++;
  if (Zs(n.next, !0)) {
    for (n.advance(), t++; Zs(n.next, !1); )
      n.advance(), t++;
    for (; Ml.indexOf(n.next) > -1; )
      n.advance(), t++;
    if (n.next == OQ) return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!Zs(n.next, !0)) return;
        break;
      }
      if (n.next != "extends".charCodeAt(i)) break;
      n.advance(), t++;
    }
  }
  n.acceptToken(tQ, -t);
}), xQ = Pi({
  "get set async static": m.modifier,
  "for while do if else switch try catch finally return throw break continue default case defer": m.controlKeyword,
  "in of await yield void typeof delete instanceof as satisfies": m.operatorKeyword,
  "let var const using function class extends": m.definitionKeyword,
  "import export from": m.moduleKeyword,
  "with debugger new": m.keyword,
  TemplateString: m.special(m.string),
  super: m.atom,
  BooleanLiteral: m.bool,
  this: m.self,
  null: m.null,
  Star: m.modifier,
  VariableName: m.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": m.function(m.variableName),
  VariableDefinition: m.definition(m.variableName),
  Label: m.labelName,
  PropertyName: m.propertyName,
  PrivatePropertyName: m.special(m.propertyName),
  "CallExpression/MemberExpression/PropertyName": m.function(m.propertyName),
  "FunctionDeclaration/VariableDefinition": m.function(m.definition(m.variableName)),
  "ClassDeclaration/VariableDefinition": m.definition(m.className),
  "NewExpression/VariableName": m.className,
  PropertyDefinition: m.definition(m.propertyName),
  PrivatePropertyDefinition: m.definition(m.special(m.propertyName)),
  UpdateOp: m.updateOperator,
  "LineComment Hashbang": m.lineComment,
  BlockComment: m.blockComment,
  Number: m.number,
  String: m.string,
  Escape: m.escape,
  ArithOp: m.arithmeticOperator,
  LogicOp: m.logicOperator,
  BitOp: m.bitwiseOperator,
  CompareOp: m.compareOperator,
  RegExp: m.regexp,
  Equals: m.definitionOperator,
  Arrow: m.function(m.punctuation),
  ": Spread": m.punctuation,
  "( )": m.paren,
  "[ ]": m.squareBracket,
  "{ }": m.brace,
  "InterpolationStart InterpolationEnd": m.special(m.brace),
  ".": m.derefOperator,
  ", ;": m.separator,
  "@": m.meta,
  TypeName: m.typeName,
  TypeDefinition: m.definition(m.typeName),
  "type enum interface implements namespace module declare": m.definitionKeyword,
  "abstract global Privacy readonly override": m.modifier,
  "is keyof unique infer asserts": m.operatorKeyword,
  JSXAttributeValue: m.attributeValue,
  JSXText: m.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": m.angleBracket,
  "JSXIdentifier JSXNameSpacedName": m.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": m.attributeName,
  "JSXBuiltin/JSXIdentifier": m.standard(m.tagName)
}), wQ = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, $Q = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, PQ = { __proto__: null, "<": 193 }, vQ = Qi.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: mQ,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [xQ],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [QQ, bQ, yQ, kQ, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, SQ, new Lr("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new Lr("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (n) => wQ[n] || -1 }, { term: 343, get: (n) => $Q[n] || -1 }, { term: 95, get: (n) => PQ[n] || -1 }],
  tokenPrec: 15201
}), iO = [
  /* @__PURE__ */ ye("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ ye(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ ye(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ ye(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ ye('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ ye('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], TQ = /* @__PURE__ */ iO.concat([
  /* @__PURE__ */ ye("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ ye("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), Mh = /* @__PURE__ */ new Tf(), nO = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Yi(n) {
  return (e, t) => {
    let i = e.node.getChild("VariableDefinition");
    return i && t(i, n), !0;
  };
}
const ZQ = ["FunctionDeclaration"], CQ = {
  FunctionDeclaration: /* @__PURE__ */ Yi("function"),
  ClassDeclaration: /* @__PURE__ */ Yi("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Yi("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Yi("type"),
  NamespaceDeclaration: /* @__PURE__ */ Yi("namespace"),
  VariableDefinition(n, e) {
    n.matchContext(ZQ) || e(n, "variable");
  },
  TypeDefinition(n, e) {
    e(n, "type");
  },
  __proto__: null
};
function rO(n, e) {
  let t = Mh.get(e);
  if (t)
    return t;
  let i = [], r = !0;
  function s(l, o) {
    let a = n.sliceString(l.from, l.to);
    i.push({ label: a, type: o });
  }
  return e.cursor(W.IncludeAnonymous).iterate((l) => {
    if (r)
      r = !1;
    else if (l.name) {
      let o = CQ[l.name];
      if (o && o(l, s) || nO.has(l.name))
        return !1;
    } else if (l.to - l.from > 8192) {
      for (let o of rO(n, l.node))
        i.push(o);
      return !1;
    }
  }), Mh.set(e, i), i;
}
const Lh = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, sO = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  "JSXText",
  "JSXAttributeValue",
  "JSXOpenTag",
  "JSXCloseTag",
  "JSXSelfClosingTag",
  ".",
  "?."
];
function AQ(n) {
  let e = re(n.state).resolveInner(n.pos, -1);
  if (sO.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && Lh.test(n.state.sliceDoc(e.from, e.to));
  if (!t && !n.explicit)
    return null;
  let i = [];
  for (let r = e; r; r = r.parent)
    nO.has(r.name) && (i = i.concat(rO(n.state.doc, r)));
  return {
    options: i,
    from: t ? e.from : n.pos,
    validFor: Lh
  };
}
const lt = /* @__PURE__ */ gi.define({
  name: "javascript",
  parser: /* @__PURE__ */ vQ.configure({
    props: [
      /* @__PURE__ */ Pn.add({
        IfStatement: /* @__PURE__ */ cr({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ cr({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: lm,
        SwitchBody: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ sm({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ cr({ except: /^\s*{/ }),
        JSXElement(n) {
          let e = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        JSXEscape(n) {
          let e = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ vn.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": Lf,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        },
        JSXElement(n) {
          let e = n.firstChild;
          if (!e || e.name == "JSXSelfClosingTag")
            return null;
          let t = n.lastChild;
          return { from: e.to, to: t.type.isError ? n.to : t.from };
        },
        "JSXSelfClosingTag JSXOpenTag"(n) {
          var e;
          let t = (e = n.firstChild) === null || e === void 0 ? void 0 : e.nextSibling, i = n.lastChild;
          return !t || t.type.isError ? null : { from: t.to, to: i.type.isError ? n.to : i.from };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), lO = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ so({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, oO = /* @__PURE__ */ lt.configure({ dialect: "ts" }, "typescript"), aO = /* @__PURE__ */ lt.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ lo.add((n) => n.isTop ? [lO] : void 0)]
}), hO = /* @__PURE__ */ lt.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ lo.add((n) => n.isTop ? [lO] : void 0)]
}, "typescript");
let cO = (n) => ({ label: n, type: "keyword" });
const fO = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(cO), XQ = /* @__PURE__ */ fO.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(cO));
function RQ(n = {}) {
  let e = n.jsx ? n.typescript ? hO : aO : n.typescript ? oO : lt, t = n.typescript ? TQ.concat(XQ) : iO.concat(fO);
  return new un(e, [
    lt.data.of({
      autocomplete: j0(sO, L0(t))
    }),
    lt.data.of({
      autocomplete: AQ
    }),
    n.jsx ? jQ : []
  ]);
}
function MQ(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function jh(n, e, t = n.length) {
  for (let i = e == null ? void 0 : e.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, t));
  return "";
}
const LQ = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), jQ = /* @__PURE__ */ C.inputHandler.of((n, e, t, i, r) => {
  if ((LQ ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !lt.isActiveAt(n.state, e, -1))
    return !1;
  let s = r(), { state: l } = s, o = l.changeByRange((a) => {
    var h;
    let { head: c } = a, f = re(l).resolveInner(c - 1, -1), u;
    if (f.name == "JSXStartTag" && (f = f.parent), !(l.doc.sliceString(c - 1, c) != i || f.name == "JSXAttributeValue" && f.to > c)) {
      if (i == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: c, insert: "</>" } };
      if (i == "/" && f.name == "JSXStartCloseTag") {
        let O = f.parent, d = O.parent;
        if (d && O.from == c - 2 && ((u = jh(l.doc, d.firstChild, c)) || ((h = d.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let p = `${u}>`;
          return { range: Q.cursor(c + p.length, -1), changes: { from: c, insert: p } };
        }
      } else if (i == ">") {
        let O = MQ(f);
        if (O && O.name == "JSXOpenTag" && !/^\/?>|^<\//.test(l.doc.sliceString(c, c + 2)) && (u = jh(l.doc, O, c)))
          return { range: a, changes: { from: c, insert: `</${u}>` } };
      }
    }
    return { range: a };
  });
  return o.changes.empty ? !1 : (n.dispatch([
    s,
    l.update(o, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
}), zi = ["_blank", "_self", "_top", "_parent"], Cs = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], As = ["get", "post", "put", "delete"], Xs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], ve = ["true", "false"], Z = {}, EQ = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: zi,
      hreflang: null
    }
  },
  abbr: Z,
  address: Z,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: Z,
  aside: Z,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: Z,
  base: { attrs: { href: null, target: zi } },
  bdi: Z,
  bdo: Z,
  blockquote: { attrs: { cite: null } },
  body: Z,
  br: Z,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Xs,
      formmethod: As,
      formnovalidate: ["novalidate"],
      formtarget: zi,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: Z,
  center: Z,
  cite: Z,
  code: Z,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: Z,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: Z,
  div: Z,
  dl: Z,
  dt: Z,
  em: Z,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: Z,
  figure: Z,
  footer: Z,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Cs,
      autocomplete: ["on", "off"],
      enctype: Xs,
      method: As,
      novalidate: ["novalidate"],
      target: zi
    }
  },
  h1: Z,
  h2: Z,
  h3: Z,
  h4: Z,
  h5: Z,
  h6: Z,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: Z,
  hgroup: Z,
  hr: Z,
  html: {
    attrs: { manifest: null }
  },
  i: Z,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: Xs,
      formmethod: As,
      formnovalidate: ["novalidate"],
      formtarget: zi,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: Z,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: Z,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: Z,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Cs,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: Z,
  noscript: Z,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: Z,
  param: { attrs: { name: null, value: null } },
  pre: Z,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: Z,
  rt: Z,
  ruby: Z,
  samp: Z,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Cs
    }
  },
  section: Z,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: Z,
  source: { attrs: { src: null, type: null, media: null } },
  span: Z,
  strong: Z,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: Z,
  summary: Z,
  sup: Z,
  table: Z,
  tbody: Z,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: Z,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: Z,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: Z,
  time: { attrs: { datetime: null } },
  title: Z,
  tr: Z,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: Z,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: Z
}, uO = {
  accesskey: null,
  class: null,
  contenteditable: ve,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: ve,
  autocorrect: ve,
  autocapitalize: ve,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": ve,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": ve,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": ve,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": ve,
  "aria-hidden": ve,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": ve,
  "aria-multiselectable": ve,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": ve,
  "aria-relevant": null,
  "aria-required": ve,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
}, OO = /* @__PURE__ */ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let n of OO)
  uO[n] = null;
class mn {
  constructor(e, t) {
    this.tags = { ...EQ, ...e }, this.globalAttrs = { ...uO, ...t }, this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
  }
}
mn.default = /* @__PURE__ */ new mn();
function Gt(n, e, t = n.length) {
  if (!e)
    return "";
  let i = e.firstChild, r = i && i.getChild("TagName");
  return r ? n.sliceString(r.from, Math.min(r.to, t)) : "";
}
function bi(n, e = !1) {
  for (; n; n = n.parent)
    if (n.name == "Element")
      if (e)
        e = !1;
      else
        return n;
  return null;
}
function dO(n, e, t) {
  let i = t.tags[Gt(n, bi(e))];
  return (i == null ? void 0 : i.children) || t.allTags;
}
function xo(n, e) {
  let t = [];
  for (let i = bi(e); i && !i.type.isTop; i = bi(i.parent)) {
    let r = Gt(n, i);
    if (r && i.lastChild.name == "CloseTag")
      break;
    r && t.indexOf(r) < 0 && (e.name == "EndTag" || e.from >= i.firstChild.to) && t.push(r);
  }
  return t;
}
const pO = /^[:\-\.\w\u00b7-\uffff]*$/;
function Eh(n, e, t, i, r) {
  let s = /\s*>/.test(n.sliceDoc(r, r + 5)) ? "" : ">", l = bi(t, t.name == "StartTag" || t.name == "TagName");
  return {
    from: i,
    to: r,
    options: dO(n.doc, l, e).map((o) => ({ label: o, type: "type" })).concat(xo(n.doc, t).map((o, a) => ({
      label: "/" + o,
      apply: "/" + o + s,
      type: "type",
      boost: 99 - a
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function Yh(n, e, t, i) {
  let r = /\s*>/.test(n.sliceDoc(i, i + 5)) ? "" : ">";
  return {
    from: t,
    to: i,
    options: xo(n.doc, e).map((s, l) => ({ label: s, apply: s + r, type: "type", boost: 99 - l })),
    validFor: pO
  };
}
function YQ(n, e, t, i) {
  let r = [], s = 0;
  for (let l of dO(n.doc, t, e))
    r.push({ label: "<" + l, type: "type" });
  for (let l of xo(n.doc, t))
    r.push({ label: "</" + l + ">", type: "type", boost: 99 - s++ });
  return { from: i, to: i, options: r, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function zQ(n, e, t, i, r) {
  let s = bi(t), l = s ? e.tags[Gt(n.doc, s)] : null, o = l && l.attrs ? Object.keys(l.attrs) : [], a = l && l.globalAttrs === !1 ? o : o.length ? o.concat(e.globalAttrNames) : e.globalAttrNames;
  return {
    from: i,
    to: r,
    options: a.map((h) => ({ label: h, type: "property" })),
    validFor: pO
  };
}
function _Q(n, e, t, i, r) {
  var s;
  let l = (s = t.parent) === null || s === void 0 ? void 0 : s.getChild("AttributeName"), o = [], a;
  if (l) {
    let h = n.sliceDoc(l.from, l.to), c = e.globalAttrs[h];
    if (!c) {
      let f = bi(t), u = f ? e.tags[Gt(n.doc, f)] : null;
      c = (u == null ? void 0 : u.attrs) && u.attrs[h];
    }
    if (c) {
      let f = n.sliceDoc(i, r).toLowerCase(), u = '"', O = '"';
      /^['"]/.test(f) ? (a = f[0] == '"' ? /^[^"]*$/ : /^[^']*$/, u = "", O = n.sliceDoc(r, r + 1) == f[0] ? "" : f[0], f = f.slice(1), i++) : a = /^[^\s<>='"]*$/;
      for (let d of c)
        o.push({ label: d, apply: u + d + O, type: "constant" });
    }
  }
  return { from: i, to: r, options: o, validFor: a };
}
function gO(n, e) {
  let { state: t, pos: i } = e, r = re(t).resolveInner(i, -1), s = r.resolve(i);
  for (let l = i, o; s == r && (o = r.childBefore(l)); ) {
    let a = o.lastChild;
    if (!a || !a.type.isError || a.from < a.to)
      break;
    s = r = o, l = a.from;
  }
  return r.name == "TagName" ? r.parent && /CloseTag$/.test(r.parent.name) ? Yh(t, r, r.from, i) : Eh(t, n, r, r.from, i) : r.name == "StartTag" || r.name == "IncompleteTag" ? Eh(t, n, r, i, i) : r.name == "StartCloseTag" || r.name == "IncompleteCloseTag" ? Yh(t, r, i, i) : r.name == "OpenTag" || r.name == "SelfClosingTag" || r.name == "AttributeName" ? zQ(t, n, r, r.name == "AttributeName" ? r.from : i, i) : r.name == "Is" || r.name == "AttributeValue" || r.name == "UnquotedAttributeValue" ? _Q(t, n, r, r.name == "Is" ? i : r.from, i) : e.explicit && (s.name == "Element" || s.name == "Text" || s.name == "Document") ? YQ(t, n, r, i) : null;
}
function WQ(n) {
  return gO(mn.default, n);
}
function BQ(n) {
  let { extraTags: e, extraGlobalAttributes: t } = n, i = t || e ? new mn(e, t) : mn.default;
  return (r) => gO(i, r);
}
const VQ = /* @__PURE__ */ lt.parser.configure({ top: "SingleExpression" }), mO = [
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript" || n.lang == "ts",
    parser: oO.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/babel" || n.type == "text/jsx",
    parser: aO.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript-jsx",
    parser: hO.parser
  },
  {
    tag: "script",
    attrs(n) {
      return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(n.type);
    },
    parser: VQ
  },
  {
    tag: "script",
    attrs(n) {
      return !n.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(n.type);
    },
    parser: lt.parser
  },
  {
    tag: "style",
    attrs(n) {
      return (!n.lang || n.lang == "css") && (!n.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(n.type));
    },
    parser: Er.parser
  }
], SO = /* @__PURE__ */ [
  {
    name: "style",
    parser: /* @__PURE__ */ Er.parser.configure({ top: "Styles" })
  }
].concat(/* @__PURE__ */ OO.map((n) => ({ name: n, parser: lt.parser }))), QO = /* @__PURE__ */ gi.define({
  name: "html",
  parser: /* @__PURE__ */ dS.configure({
    props: [
      /* @__PURE__ */ Pn.add({
        Element(n) {
          let e = /^(\s*)(<\/)?/.exec(n.textAfter);
          return n.node.to <= n.pos + e[0].length ? n.continue() : n.lineIndent(n.node.from) + (e[2] ? 0 : n.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        },
        Document(n) {
          if (n.pos + /\s*/.exec(n.textAfter)[0].length < n.node.to)
            return n.continue();
          let e = null, t;
          for (let i = n.node; ; ) {
            let r = i.lastChild;
            if (!r || r.name != "Element" || r.to != i.to)
              break;
            e = i = r;
          }
          return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? n.lineIndent(e.from) + n.unit : null;
        }
      }),
      /* @__PURE__ */ vn.add({
        Element(n) {
          let e = n.firstChild, t = n.lastChild;
          return !e || e.name != "OpenTag" ? null : { from: e.to, to: t.name == "CloseTag" ? t.from : n.to };
        }
      }),
      /* @__PURE__ */ jf.add({
        "OpenTag CloseTag": (n) => n.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-_"
  }
}), Or = /* @__PURE__ */ QO.configure({
  wrap: /* @__PURE__ */ Uu(mO, SO)
});
function qQ(n = {}) {
  let e = "", t;
  n.matchClosingTags === !1 && (e = "noMatch"), n.selfClosingTags === !0 && (e = (e ? e + " " : "") + "selfClosing"), (n.nestedLanguages && n.nestedLanguages.length || n.nestedAttributes && n.nestedAttributes.length) && (t = Uu((n.nestedLanguages || []).concat(mO), (n.nestedAttributes || []).concat(SO)));
  let i = t ? QO.configure({ wrap: t, dialect: e }) : e ? Or.configure({ dialect: e }) : Or;
  return new un(i, [
    Or.data.of({ autocomplete: BQ(n) }),
    n.autoCloseTags !== !1 ? IQ : [],
    RQ().support,
    FS().support
  ]);
}
const zh = /* @__PURE__ */ new Set(/* @__PURE__ */ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
function DQ(n, e, t) {
  for (var i; ; ) {
    if (((i = e.lastChild) === null || i === void 0 ? void 0 : i.name) != "CloseTag")
      return !1;
    let r = e.parent;
    if (!r || Gt(n, r) != t)
      return !0;
    e = r;
  }
}
const IQ = /* @__PURE__ */ C.inputHandler.of((n, e, t, i, r) => {
  if (n.composing || n.state.readOnly || e != t || i != ">" && i != "/" || !Or.isActiveAt(n.state, e, -1))
    return !1;
  let s = r(), { state: l } = s, o = l.changeByRange((a) => {
    var h;
    let c = l.doc.sliceString(a.from - 1, a.to) == i, { head: f } = a, u = re(l).resolveInner(f, -1), O;
    if (c && i == ">" && u.name == "EndTag") {
      let d = u.parent;
      if ((O = Gt(l.doc, d.parent, f)) && !zh.has(O) && !DQ(l.doc, d.parent, O)) {
        let p = f + (l.doc.sliceString(f, f + 1) === ">" ? 1 : 0), g = `</${O}>`;
        return { range: a, changes: { from: f, to: p, insert: g } };
      }
    } else if (c && i == "/" && u.name == "IncompleteCloseTag") {
      let d = u.parent;
      if (u.from == f - 2 && ((h = d.lastChild) === null || h === void 0 ? void 0 : h.name) != "CloseTag" && (O = Gt(l.doc, d, f)) && !zh.has(O)) {
        let p = f + (l.doc.sliceString(f, f + 1) === ">" ? 1 : 0), g = `${O}>`;
        return {
          range: Q.cursor(f + g.length, -1),
          changes: { from: f, to: p, insert: g }
        };
      }
    }
    return { range: a };
  });
  return o.changes.empty ? !1 : (n.dispatch([
    s,
    l.update(o, {
      userEvent: "input.complete",
      scrollIntoView: !0
    })
  ]), !0);
}), bO = /* @__PURE__ */ so({ commentTokens: { block: { open: "<!--", close: "-->" } } }), yO = /* @__PURE__ */ new R(), kO = /* @__PURE__ */ a1.configure({
  props: [
    /* @__PURE__ */ vn.add((n) => !n.is("Block") || n.is("Document") || jl(n) != null || GQ(n) ? void 0 : (e, t) => ({ from: t.doc.lineAt(e.from).to, to: e.to })),
    /* @__PURE__ */ yO.add(jl),
    /* @__PURE__ */ Pn.add({
      Document: () => null
    }),
    /* @__PURE__ */ ii.add({
      Document: bO
    })
  ]
});
function jl(n) {
  let e = /^(?:ATX|Setext)Heading(\d)$/.exec(n.name);
  return e ? +e[1] : void 0;
}
function GQ(n) {
  return n.name == "OrderedList" || n.name == "BulletList";
}
function NQ(n, e) {
  let t = n;
  for (; ; ) {
    let i = t.nextSibling, r;
    if (!i || (r = jl(i.type)) != null && r <= e)
      break;
    t = i;
  }
  return t.to;
}
const UQ = /* @__PURE__ */ om.of((n, e, t) => {
  for (let i = re(n).resolveInner(t, -1); i && !(i.from < e); i = i.parent) {
    let r = i.type.prop(yO);
    if (r == null)
      continue;
    let s = NQ(i, r);
    if (s > t)
      return { from: t, to: s };
  }
  return null;
});
function wo(n) {
  return new Be(bO, n, [], "markdown");
}
const FQ = /* @__PURE__ */ wo(kO), HQ = /* @__PURE__ */ kO.configure([Q1, y1, b1, k1, {
  props: [
    /* @__PURE__ */ vn.add({
      Table: (n, e) => ({ from: e.doc.lineAt(n.from).to, to: n.to })
    })
  ]
}]), Yr = /* @__PURE__ */ wo(HQ);
function KQ(n, e) {
  return (t) => {
    if (t && n) {
      let i = null;
      if (t = /\S*/.exec(t)[0], typeof n == "function" ? i = n(t) : i = vr.matchLanguageName(n, t, !0), i instanceof vr)
        return i.support ? i.support.language.parser : fn.getSkippingParser(i.load());
      if (i)
        return i.parser;
    }
    return e ? e.parser : null;
  };
}
class Rs {
  constructor(e, t, i, r, s, l, o) {
    this.node = e, this.from = t, this.to = i, this.spaceBefore = r, this.spaceAfter = s, this.type = l, this.item = o;
  }
  blank(e, t = !0) {
    let i = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
    if (e != null) {
      for (; i.length < e; )
        i += " ";
      return i;
    } else {
      for (let r = this.to - this.from - i.length - this.spaceAfter.length; r > 0; r--)
        i += " ";
      return i + (t ? this.spaceAfter : "");
    }
  }
  marker(e, t) {
    let i = this.node.name == "OrderedList" ? String(+wO(this.item, e)[2] + t) : "";
    return this.spaceBefore + i + this.type + this.spaceAfter;
  }
}
function xO(n, e) {
  let t = [], i = [];
  for (let r = n; r; r = r.parent) {
    if (r.name == "FencedCode")
      return i;
    (r.name == "ListItem" || r.name == "Blockquote") && t.push(r);
  }
  for (let r = t.length - 1; r >= 0; r--) {
    let s = t[r], l, o = e.lineAt(s.from), a = s.from - o.from;
    if (s.name == "Blockquote" && (l = /^ *>( ?)/.exec(o.text.slice(a))))
      i.push(new Rs(s, a, a + l[0].length, "", l[1], ">", null));
    else if (s.name == "ListItem" && s.parent.name == "OrderedList" && (l = /^( *)\d+([.)])( *)/.exec(o.text.slice(a)))) {
      let h = l[3], c = l[0].length;
      h.length >= 4 && (h = h.slice(0, h.length - 4), c -= 4), i.push(new Rs(s.parent, a, a + c, l[1], h, l[2], s));
    } else if (s.name == "ListItem" && s.parent.name == "BulletList" && (l = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(o.text.slice(a)))) {
      let h = l[4], c = l[0].length;
      h.length > 4 && (h = h.slice(0, h.length - 4), c -= 4);
      let f = l[2];
      l[3] && (f += l[3].replace(/[xX]/, " ")), i.push(new Rs(s.parent, a, a + c, l[1], h, f, s));
    }
  }
  return i;
}
function wO(n, e) {
  return /^(\s*)(\d+)(?=[.)])/.exec(e.sliceString(n.from, n.from + 10));
}
function Ms(n, e, t, i = 0) {
  for (let r = -1, s = n; ; ) {
    if (s.name == "ListItem") {
      let o = wO(s, e), a = +o[2];
      if (r >= 0) {
        if (a != r + 1)
          return;
        t.push({ from: s.from + o[1].length, to: s.from + o[0].length, insert: String(r + 2 + i) });
      }
      r = a;
    }
    let l = s.nextSibling;
    if (!l)
      break;
    s = l;
  }
}
function $o(n, e) {
  let t = /^[ \t]*/.exec(n)[0].length;
  if (!t || e.facet($n) != "	")
    return n;
  let i = gt(n, 4, t), r = "";
  for (let s = i; s > 0; )
    s >= 4 ? (r += "	", s -= 4) : (r += " ", s--);
  return r + n.slice(t);
}
const JQ = (n = {}) => ({ state: e, dispatch: t }) => {
  let i = re(e), { doc: r } = e, s = null, l = e.changeByRange((o) => {
    if (!o.empty || !Yr.isActiveAt(e, o.from, -1) && !Yr.isActiveAt(e, o.from, 1))
      return s = { range: o };
    let a = o.from, h = r.lineAt(a), c = xO(i.resolveInner(a, -1), r);
    for (; c.length && c[c.length - 1].from > a - h.from; )
      c.pop();
    if (!c.length)
      return s = { range: o };
    let f = c[c.length - 1];
    if (f.to - f.spaceAfter.length > a - h.from)
      return s = { range: o };
    let u = a >= f.to - f.spaceAfter.length && !/\S/.test(h.text.slice(f.to));
    if (f.item && u) {
      if (f.item.from < h.from && !/^[\s>]*$/.test(h.text.slice(0, f.to)))
        return s = { range: o };
      let S = f.node.firstChild, y = f.node.getChild("ListItem", "ListItem");
      if (S.to >= a || y && y.to < a || h.from > 0 && !/[^\s>]/.test(r.lineAt(h.from - 1).text) || n.nonTightLists === !1) {
        let b = c.length > 1 ? c[c.length - 2] : null, A, $ = "";
        b && b.item ? (A = h.from + b.from, $ = b.marker(r, 1)) : A = h.from + (b ? b.to : 0);
        let v = [{ from: A, to: a, insert: $ }];
        return f.node.name == "OrderedList" && Ms(f.item, r, v, -2), b && b.node.name == "OrderedList" && Ms(b.item, r, v), { range: Q.cursor(A + $.length), changes: v };
      } else {
        let b = Wh(c, e, h);
        return {
          range: Q.cursor(a + b.length + 1),
          changes: { from: h.from, insert: b + e.lineBreak }
        };
      }
    }
    if (f.node.name == "Blockquote" && u && h.from) {
      let S = r.lineAt(h.from - 1), y = />\s*$/.exec(S.text);
      if (y && y.index == f.from) {
        let b = e.changes([
          { from: S.from + y.index, to: S.to },
          { from: h.from + f.from, to: h.to }
        ]);
        return { range: o.map(b), changes: b };
      }
    }
    let O = [];
    f.node.name == "OrderedList" && Ms(f.item, r, O);
    let d = f.item && f.item.from < h.from, p = "";
    if (!d || /^[\s\d.)\-+*>]*/.exec(h.text)[0].length >= f.to)
      for (let S = 0, y = c.length - 1; S <= y; S++)
        p += S == y && !d ? c[S].marker(r, 1) : c[S].blank(S < y ? gt(h.text, 4, c[S + 1].from) - p.length : null);
    let g = a;
    for (; g > h.from && /\s/.test(h.text.charAt(g - h.from - 1)); )
      g--;
    return p = $o(p, e), tb(f.node, e.doc) && (p = Wh(c, e, h) + e.lineBreak + p), O.push({ from: g, to: a, insert: e.lineBreak + p }), { range: Q.cursor(g + p.length + 1), changes: O };
  });
  return s ? !1 : (t(e.update(l, { scrollIntoView: !0, userEvent: "input" })), !0);
}, eb = /* @__PURE__ */ JQ();
function _h(n) {
  return n.name == "QuoteMark" || n.name == "ListMark";
}
function tb(n, e) {
  if (n.name != "OrderedList" && n.name != "BulletList")
    return !1;
  let t = n.firstChild, i = n.getChild("ListItem", "ListItem");
  if (!i)
    return !1;
  let r = e.lineAt(t.to), s = e.lineAt(i.from), l = /^[\s>]*$/.test(r.text);
  return r.number + (l ? 0 : 1) < s.number;
}
function Wh(n, e, t) {
  let i = "";
  for (let r = 0, s = n.length - 2; r <= s; r++)
    i += n[r].blank(r < s ? gt(t.text, 4, n[r + 1].from) - i.length : null, r < s);
  return $o(i, e);
}
function ib(n, e) {
  let t = n.resolveInner(e, -1), i = e;
  _h(t) && (i = t.from, t = t.parent);
  for (let r; r = t.childBefore(i); )
    if (_h(r))
      i = r.from;
    else if (r.name == "OrderedList" || r.name == "BulletList")
      t = r.lastChild, i = t.to;
    else
      break;
  return t;
}
const nb = ({ state: n, dispatch: e }) => {
  let t = re(n), i = null, r = n.changeByRange((s) => {
    let l = s.from, { doc: o } = n;
    if (s.empty && Yr.isActiveAt(n, s.from)) {
      let a = o.lineAt(l), h = xO(ib(t, l), o);
      if (h.length) {
        let c = h[h.length - 1], f = c.to - c.spaceAfter.length + (c.spaceAfter ? 1 : 0);
        if (l - a.from > f && !/\S/.test(a.text.slice(f, l - a.from)))
          return {
            range: Q.cursor(a.from + f),
            changes: { from: a.from + f, to: l }
          };
        if (l - a.from == f && // Only apply this if we're on the line that has the
        // construct's syntax, or there's only indentation in the
        // target range
        (c.item && a.from <= c.item.from || /^[\s>]*$/.test(a.text.slice(0, c.to)))) {
          let u = a.from + c.from;
          if (c.item && c.node.from < c.item.from && /\S/.test(a.text.slice(c.from, c.to))) {
            let O = c.blank(gt(a.text, 4, c.to) - gt(a.text, 4, c.from));
            return u == a.from && (O = $o(O, n)), {
              range: Q.cursor(u + O.length),
              changes: { from: u, to: a.from + c.to, insert: O }
            };
          }
          if (u < l)
            return { range: Q.cursor(u), changes: { from: u, to: l } };
        }
      }
    }
    return i = { range: s };
  });
  return i ? !1 : (e(n.update(r, { scrollIntoView: !0, userEvent: "delete" })), !0);
}, rb = [
  { key: "Enter", run: eb },
  { key: "Backspace", run: nb }
], $O = /* @__PURE__ */ qQ({ matchClosingTags: !1 });
function PO(n = {}) {
  let { codeLanguages: e, defaultCodeLanguage: t, addKeymap: i = !0, base: { parser: r } = FQ, completeHTMLTags: s = !0, pasteURLAsLink: l = !0, htmlTagLanguage: o = $O } = n;
  if (!(r instanceof Kr))
    throw new RangeError("Base parser provided to `markdown` should be a Markdown parser");
  let a = n.extensions ? [n.extensions] : [], h = [o.support, UQ], c;
  l && h.push(ab), t instanceof un ? (h.push(t.support), c = t.language) : t && (c = t);
  let f = e || c ? KQ(e, c) : void 0;
  a.push(c1({ codeParser: f, htmlParser: o.language.parser })), i && h.push($i.high(Ir.of(rb)));
  let u = wo(r.configure(a));
  return s && h.push(u.data.of({ autocomplete: sb })), new un(u, h);
}
function sb(n) {
  let { state: e, pos: t } = n, i = /<[:\-\.\w\u00b7-\uffff]*$/.exec(e.sliceDoc(t - 25, t));
  if (!i)
    return null;
  let r = re(e).resolveInner(t, -1);
  for (; r && !r.type.isTop; ) {
    if (r.name == "CodeBlock" || r.name == "FencedCode" || r.name == "ProcessingInstructionBlock" || r.name == "CommentBlock" || r.name == "Link" || r.name == "Image")
      return null;
    r = r.parent;
  }
  return {
    from: t - i[0].length,
    to: t,
    options: lb(),
    validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
  };
}
let Ls = null;
function lb() {
  if (Ls)
    return Ls;
  let n = WQ(new R0(z.create({ extensions: $O }), 0, !0));
  return Ls = n ? n.options : [];
}
const ob = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, ab = /* @__PURE__ */ C.domEventHandlers({
  paste: (n, e) => {
    var t;
    let { main: i } = e.state.selection;
    if (i.empty)
      return !1;
    let r = (t = n.clipboardData) === null || t === void 0 ? void 0 : t.getData("text/plain");
    if (!r || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(r) || (/^www\./.test(r) && (r = "https://" + r), !Yr.isActiveAt(e.state, i.from, 1)))
      return !1;
    let s = re(e.state), l = !1;
    return s.iterate({
      from: i.from,
      to: i.to,
      enter: (o) => {
        (o.from > i.from || ob.test(o.name)) && (l = !0);
      },
      leave: (o) => {
        o.to < i.to && (l = !0);
      }
    }), l ? !1 : (e.dispatch({
      changes: [{ from: i.from, insert: "[" }, { from: i.to, insert: `](${r})` }],
      userEvent: "input.paste",
      scrollIntoView: !0
    }), !0);
  }
});
class ne {
  constructor(e, t, i, r) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = r;
  }
  /**
  @internal
  */
  offset(e, t = e) {
    return new ne(this.fromA + e, this.toA + e, this.fromB + t, this.toB + t);
  }
}
function Nt(n, e, t, i, r, s) {
  if (n == i)
    return [];
  let l = vo(n, e, t, i, r, s), o = To(n, e + l, t, i, r + l, s);
  e += l, t -= o, r += l, s -= o;
  let a = t - e, h = s - r;
  if (!a || !h)
    return [new ne(e, t, r, s)];
  if (a > h) {
    let f = n.slice(e, t).indexOf(i.slice(r, s));
    if (f > -1)
      return [
        new ne(e, e + f, r, r),
        new ne(e + f + h, t, s, s)
      ];
  } else if (h > a) {
    let f = i.slice(r, s).indexOf(n.slice(e, t));
    if (f > -1)
      return [
        new ne(e, e, r, r + f),
        new ne(t, t, r + f + a, s)
      ];
  }
  if (a == 1 || h == 1)
    return [new ne(e, t, r, s)];
  let c = ZO(n, e, t, i, r, s);
  if (c) {
    let [f, u, O] = c;
    return Nt(n, e, f, i, r, u).concat(Nt(n, f + O, t, i, u + O, s));
  }
  return hb(n, e, t, i, r, s);
}
let qi = 1e9, Di = 0, Po = !1;
function hb(n, e, t, i, r, s) {
  let l = t - e, o = s - r;
  if (qi < 1e9 && Math.min(l, o) > qi * 16 || Di > 0 && Date.now() > Di)
    return Math.min(l, o) > qi * 64 ? [new ne(e, t, r, s)] : Bh(n, e, t, i, r, s);
  let a = Math.ceil((l + o) / 2);
  js.reset(a), Es.reset(a);
  let h = (O, d) => n.charCodeAt(e + O) == i.charCodeAt(r + d), c = (O, d) => n.charCodeAt(t - O - 1) == i.charCodeAt(s - d - 1), f = (l - o) % 2 != 0 ? Es : null, u = f ? null : js;
  for (let O = 0; O < a; O++) {
    if (O > qi || Di > 0 && !(O & 63) && Date.now() > Di)
      return Bh(n, e, t, i, r, s);
    let d = js.advance(O, l, o, a, f, !1, h) || Es.advance(O, l, o, a, u, !0, c);
    if (d)
      return cb(n, e, t, e + d[0], i, r, s, r + d[1]);
  }
  return [new ne(e, t, r, s)];
}
class vO {
  constructor() {
    this.vec = [];
  }
  reset(e) {
    this.len = e << 1;
    for (let t = 0; t < this.len; t++)
      this.vec[t] = -1;
    this.vec[e + 1] = 0, this.start = this.end = 0;
  }
  advance(e, t, i, r, s, l, o) {
    for (let a = -e + this.start; a <= e - this.end; a += 2) {
      let h = r + a, c = a == -e || a != e && this.vec[h - 1] < this.vec[h + 1] ? this.vec[h + 1] : this.vec[h - 1] + 1, f = c - a;
      for (; c < t && f < i && o(c, f); )
        c++, f++;
      if (this.vec[h] = c, c > t)
        this.end += 2;
      else if (f > i)
        this.start += 2;
      else if (s) {
        let u = r + (t - i) - a;
        if (u >= 0 && u < this.len && s.vec[u] != -1)
          if (l) {
            let O = s.vec[u];
            if (O >= t - c)
              return [O, r + O - u];
          } else {
            let O = t - s.vec[u];
            if (c >= O)
              return [c, f];
          }
      }
    }
    return null;
  }
}
const js = /* @__PURE__ */ new vO(), Es = /* @__PURE__ */ new vO();
function cb(n, e, t, i, r, s, l, o) {
  let a = !1;
  return !yi(n, i) && ++i == t && (a = !0), !yi(r, o) && ++o == l && (a = !0), a ? [new ne(e, t, s, l)] : Nt(n, e, i, r, s, o).concat(Nt(n, i, t, r, o, l));
}
function TO(n, e) {
  let t = 1, i = Math.min(n, e);
  for (; t < i; )
    t = t << 1;
  return t;
}
function vo(n, e, t, i, r, s) {
  if (e == t || e == s || n.charCodeAt(e) != i.charCodeAt(r))
    return 0;
  let l = TO(t - e, s - r);
  for (let o = e, a = r; ; ) {
    let h = o + l, c = a + l;
    if (h > t || c > s || n.slice(o, h) != i.slice(a, c)) {
      if (l == 1)
        return o - e - (yi(n, o) ? 0 : 1);
      l = l >> 1;
    } else {
      if (h == t || c == s)
        return h - e;
      o = h, a = c;
    }
  }
}
function To(n, e, t, i, r, s) {
  if (e == t || r == s || n.charCodeAt(t - 1) != i.charCodeAt(s - 1))
    return 0;
  let l = TO(t - e, s - r);
  for (let o = t, a = s; ; ) {
    let h = o - l, c = a - l;
    if (h < e || c < r || n.slice(h, o) != i.slice(c, a)) {
      if (l == 1)
        return t - o - (yi(n, o) ? 0 : 1);
      l = l >> 1;
    } else {
      if (h == e || c == r)
        return t - h;
      o = h, a = c;
    }
  }
}
function El(n, e, t, i, r, s, l, o) {
  let a = i.slice(r, s), h = null;
  for (; ; ) {
    if (h || l < o)
      return h;
    for (let c = e + l; ; ) {
      yi(n, c) || c++;
      let f = c + l;
      if (yi(n, f) || (f += f == c + 1 ? 1 : -1), f >= t)
        break;
      let u = n.slice(c, f), O = -1;
      for (; (O = a.indexOf(u, O + 1)) != -1; ) {
        let d = vo(n, f, t, i, r + O + u.length, s), p = To(n, e, c, i, r, r + O), g = u.length + d + p;
        (!h || h[2] < g) && (h = [c - p, r + O - p, g]);
      }
      c = f;
    }
    if (o < 0)
      return h;
    l = l >> 1;
  }
}
function ZO(n, e, t, i, r, s) {
  let l = t - e, o = s - r;
  if (l < o) {
    let a = ZO(i, r, s, n, e, t);
    return a && [a[1], a[0], a[2]];
  }
  return l < 4 || o * 2 < l ? null : El(n, e, t, i, r, s, Math.floor(l / 4), -1);
}
function Bh(n, e, t, i, r, s) {
  Po = !0;
  let l = t - e, o = s - r, a;
  if (l < o) {
    let u = El(i, r, s, n, e, t, Math.floor(l / 6), 50);
    a = u && [u[1], u[0], u[2]];
  } else
    a = El(n, e, t, i, r, s, Math.floor(o / 6), 50);
  if (!a)
    return [new ne(e, t, r, s)];
  let [h, c, f] = a;
  return Nt(n, e, h, i, r, c).concat(Nt(n, h + f, t, i, c + f, s));
}
function CO(n, e) {
  for (let t = 1; t < n.length; t++) {
    let i = n[t - 1], r = n[t];
    i.toA > r.fromA - e && i.toB > r.fromB - e && (n[t - 1] = new ne(i.fromA, r.toA, i.fromB, r.toB), n.splice(t--, 1));
  }
}
function fb(n, e, t) {
  for (; ; ) {
    CO(t, 1);
    let i = !1;
    for (let r = 0; r < t.length; r++) {
      let s = t[r], l, o;
      (l = vo(n, s.fromA, s.toA, e, s.fromB, s.toB)) && (s = t[r] = new ne(s.fromA + l, s.toA, s.fromB + l, s.toB)), (o = To(n, s.fromA, s.toA, e, s.fromB, s.toB)) && (s = t[r] = new ne(s.fromA, s.toA - o, s.fromB, s.toB - o));
      let a = s.toA - s.fromA, h = s.toB - s.fromB;
      if (a && h)
        continue;
      let c = s.fromA - (r ? t[r - 1].toA : 0), f = (r < t.length - 1 ? t[r + 1].fromA : n.length) - s.toA;
      if (!c || !f)
        continue;
      let u = a ? n.slice(s.fromA, s.toA) : e.slice(s.fromB, s.toB);
      c <= u.length && n.slice(s.fromA - c, s.fromA) == u.slice(u.length - c) ? (t[r] = new ne(s.fromA - c, s.toA - c, s.fromB - c, s.toB - c), i = !0) : f <= u.length && n.slice(s.toA, s.toA + f) == u.slice(0, f) && (t[r] = new ne(s.fromA + f, s.toA + f, s.fromB + f, s.toB + f), i = !0);
    }
    if (!i)
      break;
  }
  return t;
}
function ub(n, e, t) {
  for (let i = 0, r = 0; r < n.length; r++) {
    let s = n[r], l = s.toA - s.fromA, o = s.toB - s.fromB;
    if (l && o || l > 3 || o > 3) {
      let a = r == n.length - 1 ? e.length : n[r + 1].fromA, h = s.fromA - i, c = a - s.toA, f = qh(e, s.fromA, h), u = Vh(e, s.toA, c), O = s.fromA - f, d = u - s.toA;
      if ((!l || !o) && O && d) {
        let p = Math.max(l, o), [g, S, y] = l ? [e, s.fromA, s.toA] : [t, s.fromB, s.toB];
        p > O && e.slice(f, s.fromA) == g.slice(y - O, y) ? (s = n[r] = new ne(f, f + l, s.fromB - O, s.toB - O), f = s.fromA, u = Vh(e, s.toA, a - s.toA)) : p > d && e.slice(s.toA, u) == g.slice(S, S + d) && (s = n[r] = new ne(u - l, u, s.fromB + d, s.toB + d), u = s.toA, f = qh(e, s.fromA, s.fromA - i)), O = s.fromA - f, d = u - s.toA;
      }
      if (O || d)
        s = n[r] = new ne(s.fromA - O, s.toA + d, s.fromB - O, s.toB + d);
      else if (l) {
        if (!o) {
          let p = Ih(e, s.fromA, s.toA), g, S = p < 0 ? -1 : Dh(e, s.toA, s.fromA);
          p > -1 && (g = p - s.fromA) <= c && e.slice(s.fromA, p) == e.slice(s.toA, s.toA + g) ? s = n[r] = s.offset(g) : S > -1 && (g = s.toA - S) <= h && e.slice(s.fromA - g, s.fromA) == e.slice(S, s.toA) && (s = n[r] = s.offset(-g));
        }
      } else {
        let p = Ih(t, s.fromB, s.toB), g, S = p < 0 ? -1 : Dh(t, s.toB, s.fromB);
        p > -1 && (g = p - s.fromB) <= c && t.slice(s.fromB, p) == t.slice(s.toB, s.toB + g) ? s = n[r] = s.offset(g) : S > -1 && (g = s.toB - S) <= h && t.slice(s.fromB - g, s.fromB) == t.slice(S, s.toB) && (s = n[r] = s.offset(-g));
      }
    }
    i = s.toA;
  }
  return CO(n, 3), n;
}
let Bt;
try {
  Bt = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}]", "u");
} catch {
}
function AO(n) {
  return n > 48 && n < 58 || n > 64 && n < 91 || n > 96 && n < 123;
}
function XO(n, e) {
  if (e == n.length)
    return 0;
  let t = n.charCodeAt(e);
  return t < 192 ? AO(t) ? 1 : 0 : Bt ? !LO(t) || e == n.length - 1 ? Bt.test(String.fromCharCode(t)) ? 1 : 0 : Bt.test(n.slice(e, e + 2)) ? 2 : 0 : 0;
}
function RO(n, e) {
  if (!e)
    return 0;
  let t = n.charCodeAt(e - 1);
  return t < 192 ? AO(t) ? 1 : 0 : Bt ? !jO(t) || e == 1 ? Bt.test(String.fromCharCode(t)) ? 1 : 0 : Bt.test(n.slice(e - 2, e)) ? 2 : 0 : 0;
}
const MO = 8;
function Vh(n, e, t) {
  if (e == n.length || !RO(n, e))
    return e;
  for (let i = e, r = e + t, s = 0; s < MO; s++) {
    let l = XO(n, i);
    if (!l || i + l > r)
      return i;
    i += l;
  }
  return e;
}
function qh(n, e, t) {
  if (!e || !XO(n, e))
    return e;
  for (let i = e, r = e - t, s = 0; s < MO; s++) {
    let l = RO(n, i);
    if (!l || i - l < r)
      return i;
    i -= l;
  }
  return e;
}
function Dh(n, e, t) {
  for (; e != t; e--)
    if (n.charCodeAt(e - 1) == 10)
      return e;
  return -1;
}
function Ih(n, e, t) {
  for (; e != t; e++)
    if (n.charCodeAt(e) == 10)
      return e;
  return -1;
}
const LO = (n) => n >= 55296 && n <= 56319, jO = (n) => n >= 56320 && n <= 57343;
function yi(n, e) {
  return !e || e == n.length || !LO(n.charCodeAt(e - 1)) || !jO(n.charCodeAt(e));
}
function Ob(n, e, t) {
  var i;
  let r = t == null ? void 0 : t.override;
  return r ? r(n, e) : (qi = ((i = t == null ? void 0 : t.scanLimit) !== null && i !== void 0 ? i : 1e9) >> 1, Di = t != null && t.timeout ? Date.now() + t.timeout : 0, Po = !1, fb(n, e, Nt(n, 0, n.length, e, 0, e.length)));
}
function EO() {
  return !Po;
}
function YO(n, e, t) {
  return ub(Ob(n, e, t), n, e);
}
const St = /* @__PURE__ */ T.define({
  combine: (n) => n[0]
}), db = /* @__PURE__ */ I.define(), zO = /* @__PURE__ */ T.define(), $e = /* @__PURE__ */ Ae.define({
  create(n) {
    return null;
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(db) && (n = t.value);
    for (let t of e.state.facet(zO))
      n = t(n, e);
    return n;
  }
});
class ci {
  constructor(e, t, i, r, s, l = !0) {
    this.changes = e, this.fromA = t, this.toA = i, this.fromB = r, this.toB = s, this.precise = l;
  }
  /**
  @internal
  */
  offset(e, t) {
    return e || t ? new ci(this.changes, this.fromA + e, this.toA + e, this.fromB + t, this.toB + t, this.precise) : this;
  }
  /**
  Returns `fromA` if the chunk is empty in A, or the end of the
  last line in the chunk otherwise.
  */
  get endA() {
    return Math.max(this.fromA, this.toA - 1);
  }
  /**
  Returns `fromB` if the chunk is empty in B, or the end of the
  last line in the chunk otherwise.
  */
  get endB() {
    return Math.max(this.fromB, this.toB - 1);
  }
  /**
  Build a set of changed chunks for the given documents.
  */
  static build(e, t, i) {
    let r = YO(e.toString(), t.toString(), i);
    return _O(r, e, t, 0, 0, EO());
  }
  /**
  Update a set of chunks for changes in document A. `a` should
  hold the updated document A.
  */
  static updateA(e, t, i, r, s) {
    return Hh(Fh(e, r, !0, i.length), e, t, i, s);
  }
  /**
  Update a set of chunks for changes in document B.
  */
  static updateB(e, t, i, r, s) {
    return Hh(Fh(e, r, !1, t.length), e, t, i, s);
  }
}
function Gh(n, e, t, i) {
  let r = t.lineAt(n), s = i.lineAt(e);
  return r.to == n && s.to == e && n < t.length && e < i.length ? [n + 1, e + 1] : [r.from, s.from];
}
function Nh(n, e, t, i) {
  let r = t.lineAt(n), s = i.lineAt(e);
  return r.from == n && s.from == e ? [n, e] : [r.to + 1, s.to + 1];
}
function _O(n, e, t, i, r, s) {
  let l = [];
  for (let o = 0; o < n.length; o++) {
    let a = n[o], [h, c] = Gh(a.fromA + i, a.fromB + r, e, t), [f, u] = Nh(a.toA + i, a.toB + r, e, t), O = [a.offset(-h + i, -c + r)];
    for (; o < n.length - 1; ) {
      let d = n[o + 1], [p, g] = Gh(d.fromA + i, d.fromB + r, e, t);
      if (p > f + 1 && g > u + 1)
        break;
      O.push(d.offset(-h + i, -c + r)), [f, u] = Nh(d.toA + i, d.toB + r, e, t), o++;
    }
    l.push(new ci(O, h, Math.max(h, f), c, Math.max(c, u), s));
  }
  return l;
}
const Kn = 1e3;
function Uh(n, e, t, i) {
  let r = 0, s = n.length;
  for (; ; ) {
    if (r == s) {
      let c = 0, f = 0;
      r && ({ toA: c, toB: f } = n[r - 1]);
      let u = e - (t ? c : f);
      return [c + u, f + u];
    }
    let l = r + s >> 1, o = n[l], [a, h] = t ? [o.fromA, o.toA] : [o.fromB, o.toB];
    if (a > e)
      s = l;
    else if (h <= e)
      r = l + 1;
    else
      return i ? [o.fromA, o.fromB] : [o.toA, o.toB];
  }
}
function Fh(n, e, t, i) {
  let r = [];
  return e.iterChangedRanges((s, l, o, a) => {
    let h = 0, c = t ? e.length : i, f = 0, u = t ? i : e.length;
    s > Kn && ([h, f] = Uh(n, s - Kn, t, !0)), l < e.length - Kn && ([c, u] = Uh(n, l + Kn, t, !1));
    let O = a - o - (l - s), d, [p, g] = t ? [O, 0] : [0, O];
    r.length && (d = r[r.length - 1]).toA >= h ? r[r.length - 1] = {
      fromA: d.fromA,
      fromB: d.fromB,
      toA: c,
      toB: u,
      diffA: d.diffA + p,
      diffB: d.diffB + g
    } : r.push({ fromA: h, toA: c, fromB: f, toB: u, diffA: p, diffB: g });
  }), r;
}
function Hh(n, e, t, i, r) {
  if (!n.length)
    return e;
  let s = [];
  for (let l = 0, o = 0, a = 0, h = 0; ; l++) {
    let c = l == n.length ? null : n[l], f = c ? c.fromA + o : t.length, u = c ? c.fromB + a : i.length;
    for (; h < e.length; ) {
      let g = e[h];
      if (c && (g.toA + o > f || g.toB + a > u))
        break;
      s.push(g.offset(o, a)), h++;
    }
    if (!c)
      break;
    let O = c.toA + o + c.diffA, d = c.toB + a + c.diffB, p = YO(t.sliceString(f, O), i.sliceString(u, d), r);
    for (let g of _O(p, t, i, f, u, EO()))
      s.push(g);
    for (o += c.diffA, a += c.diffB; h < e.length; ) {
      let g = e[h];
      if (g.fromA + o > O && g.fromB + a > d)
        break;
      h++;
    }
  }
  return s;
}
const pb = { scanLimit: 500 }, WO = /* @__PURE__ */ At.fromClass(class {
  constructor(n) {
    ({ deco: this.deco, gutter: this.gutter } = ec(n));
  }
  update(n) {
    (n.docChanged || n.viewportChanged || gb(n.startState, n.state) || mb(n.startState, n.state)) && ({ deco: this.deco, gutter: this.gutter } = ec(n.view));
  }
}, {
  decorations: (n) => n.deco
});
function gb(n, e) {
  return n.field($e, !1) != e.field($e, !1);
}
function mb(n, e) {
  return n.facet(St) != e.facet(St);
}
const Kh = /* @__PURE__ */ V.line({ class: "cm-changedLine" }), BO = /* @__PURE__ */ V.mark({ class: "cm-changedText" }), Sb = /* @__PURE__ */ V.mark({ tagName: "ins", class: "cm-insertedLine" }), Qb = /* @__PURE__ */ V.mark({ tagName: "del", class: "cm-deletedLine" }), Jh = /* @__PURE__ */ new class extends ot {
  constructor() {
    super(...arguments), this.elementClass = "cm-changedLineGutter";
  }
}();
function bb(n, e, t, i, r, s) {
  let l = t ? n.fromA : n.fromB, o = t ? n.toA : n.toB, a = 0;
  if (l != o) {
    r.add(l, l, Kh), r.add(l, o, t ? Qb : Sb), s && s.add(l, l, Jh);
    for (let h = e.iterRange(l, o - 1), c = l; !h.next().done; ) {
      if (h.lineBreak) {
        c++, r.add(c, c, Kh), s && s.add(c, c, Jh);
        continue;
      }
      let f = c + h.value.length;
      if (i)
        for (; a < n.changes.length; ) {
          let u = n.changes[a], O = l + (t ? u.fromA : u.fromB), d = l + (t ? u.toA : u.toB), p = Math.max(c, O), g = Math.min(f, d);
          if (p < g && r.add(p, g, BO), d < f)
            a++;
          else
            break;
        }
      c = f;
    }
  }
}
function ec(n) {
  let e = n.state.field($e), { side: t, highlightChanges: i, markGutter: r, overrideChunk: s } = n.state.facet(St), l = t == "a", o = new Tt(), a = r ? new Tt() : null, { from: h, to: c } = n.viewport;
  for (let f of e) {
    if ((l ? f.fromA : f.fromB) >= c)
      break;
    (l ? f.toA : f.toB) > h && (!s || !s(n.state, f, o, a)) && bb(f, n.state.doc, l, i, o, a);
  }
  return { deco: o.finish(), gutter: a && a.finish() };
}
const Yl = /* @__PURE__ */ I.define({
  map: (n, e) => e.mapPos(n)
});
class yb extends Rt {
  constructor(e) {
    super(), this.lines = e;
  }
  eq(e) {
    return this.lines == e.lines;
  }
  toDOM(e) {
    let t = document.createElement("div");
    return t.className = "cm-collapsedLines", t.textContent = e.state.phrase("$ unchanged lines", this.lines), t.addEventListener("click", (i) => {
      let r = e.posAtDOM(i.target);
      e.dispatch({ effects: Yl.of(r) });
      let { side: s, sibling: l } = e.state.facet(St);
      l && l().dispatch({ effects: Yl.of(kb(r, e.state.field($e), s == "a")) });
    }), t;
  }
  ignoreEvent(e) {
    return e instanceof MouseEvent;
  }
  get estimatedHeight() {
    return 27;
  }
  get type() {
    return "collapsed-unchanged-code";
  }
}
function kb(n, e, t) {
  let i = 0, r = 0;
  for (let s = 0; ; s++) {
    let l = s < e.length ? e[s] : null;
    if (!l || (t ? l.fromA : l.fromB) >= n)
      return r + (n - i);
    [i, r] = t ? [l.toA, l.toB] : [l.toB, l.toA];
  }
}
const xb = /* @__PURE__ */ Ae.define({
  create(n) {
    return V.none;
  },
  update(n, e) {
    n = n.map(e.changes);
    for (let t of e.effects)
      t.is(Yl) && (n = n.update({ filter: (i) => i != t.value }));
    if (n.size && e.state.field($e) != e.startState.field($e, !1)) {
      let t = e.state.facet(St).side == "a", i = [];
      for (let r of e.state.field($e))
        n.between(t ? r.fromA : r.fromB, t ? r.toA : r.toB, (s) => {
          i.push(s);
        });
      i.length && (n = n.update({ filter: (r) => i.indexOf(r) < 0 }));
    }
    return n;
  },
  provide: (n) => C.decorations.from(n)
});
function wb({ margin: n = 3, minSize: e = 4 }) {
  return xb.init((t) => $b(t, n, e));
}
function $b(n, e, t) {
  let i = new Tt(), r = n.facet(St).side == "a", s = n.field($e), l = 1;
  for (let o = 0; ; o++) {
    let a = o < s.length ? s[o] : null, h = o ? l + e : 1, c = a ? n.doc.lineAt(r ? a.fromA : a.fromB).number - 1 - e : n.doc.lines, f = c - h + 1;
    if (f >= t && i.add(n.doc.line(h).from, n.doc.line(c).to, V.replace({
      widget: new yb(f),
      block: !0
    })), !a)
      break;
    l = n.doc.lineAt(Math.min(n.doc.length, r ? a.toA : a.toB)).number;
  }
  return i.finish();
}
const Pb = /* @__PURE__ */ C.baseTheme({
  ".cm-mergeView & .cm-scroller, .cm-mergeView &": {
    height: "auto !important",
    overflowY: "visible !important"
  },
  "&.cm-merge-a .cm-changedLine, .cm-deletedChunk": {
    backgroundColor: "rgba(160, 128, 100, .08)"
  },
  "&.cm-merge-b .cm-changedLine, .cm-inlineChangedLine": {
    backgroundColor: "rgba(100, 160, 128, .08)"
  },
  "&light.cm-merge-a .cm-changedText, &light .cm-deletedChunk .cm-deletedText": {
    background: "linear-gradient(#ee443366, #ee443366) bottom/100% 2px no-repeat"
  },
  "&dark.cm-merge-a .cm-changedText, &dark .cm-deletedChunk .cm-deletedText": {
    background: "linear-gradient(#ffaa9966, #ffaa9966) bottom/100% 2px no-repeat"
  },
  "&light.cm-merge-b .cm-changedText": {
    background: "linear-gradient(#22bb22aa, #22bb22aa) bottom/100% 2px no-repeat"
  },
  "&dark.cm-merge-b .cm-changedText": {
    background: "linear-gradient(#88ff88aa, #88ff88aa) bottom/100% 2px no-repeat"
  },
  "&.cm-merge-b .cm-deletedText": {
    background: "#ff000033"
  },
  ".cm-insertedLine, .cm-deletedLine, .cm-deletedLine del": {
    textDecoration: "none"
  },
  ".cm-deletedChunk": {
    paddingLeft: "6px",
    "& .cm-chunkButtons": {
      position: "absolute",
      insetInlineEnd: "5px"
    },
    "& button": {
      border: "none",
      cursor: "pointer",
      color: "white",
      margin: "0 2px",
      borderRadius: "3px",
      "&[name=accept]": { background: "#2a2" },
      "&[name=reject]": { background: "#d43" }
    }
  },
  ".cm-collapsedLines": {
    padding: "5px 5px 5px 10px",
    cursor: "pointer",
    "&:before": {
      content: '"⦚"',
      marginInlineEnd: "7px"
    },
    "&:after": {
      content: '"⦚"',
      marginInlineStart: "7px"
    }
  },
  "&light .cm-collapsedLines": {
    color: "#444",
    background: "linear-gradient(to bottom, transparent 0, #f3f3f3 30%, #f3f3f3 70%, transparent 100%)"
  },
  "&dark .cm-collapsedLines": {
    color: "#ddd",
    background: "linear-gradient(to bottom, transparent 0, #222 30%, #222 70%, transparent 100%)"
  },
  ".cm-changeGutter": { width: "3px", paddingLeft: "1px" },
  "&light.cm-merge-a .cm-changedLineGutter, &light .cm-deletedLineGutter": { background: "#e43" },
  "&dark.cm-merge-a .cm-changedLineGutter, &dark .cm-deletedLineGutter": { background: "#fa9" },
  "&light.cm-merge-b .cm-changedLineGutter": { background: "#2b2" },
  "&dark.cm-merge-b .cm-changedLineGutter": { background: "#8f8" },
  ".cm-inlineChangedLineGutter": { background: "#75d" }
}), vb = /* @__PURE__ */ new class extends ot {
  constructor() {
    super(...arguments), this.elementClass = "cm-deletedLineGutter";
  }
}(), Tb = /* @__PURE__ */ $i.low(/* @__PURE__ */ bg({
  class: "cm-changeGutter",
  markers: (n) => {
    var e;
    return ((e = n.plugin(WO)) === null || e === void 0 ? void 0 : e.gutter) || E.empty;
  },
  widgetMarker: (n, e) => e instanceof VO ? vb : null
}));
function Zb(n) {
  var e;
  let t = typeof n.original == "string" ? j.of(n.original.split(/\r?\n/)) : n.original, i = n.diffConfig || pb;
  return [
    $i.low(WO),
    Rb,
    Pb,
    C.editorAttributes.of({ class: "cm-merge-b" }),
    zO.of((r, s) => {
      let l = s.effects.find((o) => o.is(Zo));
      return l && (r = ci.updateA(r, l.value.doc, s.startState.doc, l.value.changes, i)), s.docChanged && (r = ci.updateB(r, s.state.field(ki), s.newDoc, s.changes, i)), r;
    }),
    St.of({
      highlightChanges: n.highlightChanges !== !1,
      markGutter: n.gutter !== !1,
      syntaxHighlightDeletions: n.syntaxHighlightDeletions !== !1,
      syntaxHighlightDeletionsMaxLength: 3e3,
      mergeControls: (e = n.mergeControls) !== null && e !== void 0 ? e : !0,
      overrideChunk: n.allowInlineDiffs ? Eb : void 0,
      side: "b"
    }),
    ki.init(() => t),
    n.gutter !== !1 ? Tb : [],
    n.collapseUnchanged ? wb(n.collapseUnchanged) : [],
    $e.init((r) => ci.build(t, r.doc, i))
  ];
}
const Zo = /* @__PURE__ */ I.define(), ki = /* @__PURE__ */ Ae.define({
  create: () => j.empty,
  update(n, e) {
    for (let t of e.effects)
      t.is(Zo) && (n = t.value.doc);
    return n;
  }
}), tc = /* @__PURE__ */ new WeakMap();
class VO extends Rt {
  constructor(e) {
    super(), this.buildDOM = e, this.dom = null;
  }
  eq(e) {
    return this.dom == e.dom;
  }
  toDOM(e) {
    return this.dom || (this.dom = this.buildDOM(e));
  }
}
function Cb(n, e, t) {
  let i = tc.get(e.changes);
  if (i)
    return i;
  let r = (l) => {
    let { highlightChanges: o, syntaxHighlightDeletions: a, syntaxHighlightDeletionsMaxLength: h, mergeControls: c } = n.facet(St), f = document.createElement("div");
    if (f.className = "cm-deletedChunk", c) {
      let A = f.appendChild(document.createElement("div"));
      A.className = "cm-chunkButtons";
      let $ = (x) => {
        x.preventDefault(), Ab(l, l.posAtDOM(f));
      }, v = (x) => {
        x.preventDefault(), Xb(l, l.posAtDOM(f));
      };
      if (typeof c == "function")
        A.appendChild(c("accept", $)), A.appendChild(c("reject", v));
      else {
        let x = A.appendChild(document.createElement("button"));
        x.name = "accept", x.textContent = n.phrase("Accept"), x.onmousedown = $;
        let L = A.appendChild(document.createElement("button"));
        L.name = "reject", L.textContent = n.phrase("Reject"), L.onmousedown = v;
      }
    }
    if (t || e.fromA >= e.toA)
      return f;
    let u = l.state.field(ki).sliceString(e.fromA, e.endA), O = a && n.facet(It), d = y(), p = e.changes, g = 0, S = !1;
    function y() {
      let A = f.appendChild(document.createElement("div"));
      return A.className = "cm-deletedLine", A.appendChild(document.createElement("del"));
    }
    function b(A, $, v) {
      for (let x = A; x < $; ) {
        if (u.charAt(x) == `
`) {
          d.firstChild || d.appendChild(document.createElement("br")), d = y(), x++;
          continue;
        }
        let L = $, B = v + (S ? " cm-deletedText" : ""), N = !1, M = u.indexOf(`
`, x);
        if (M > -1 && M < $ && (L = M), o && g < p.length) {
          let X = Math.max(0, S ? p[g].toA : p[g].fromA);
          X <= L && (L = X, S && g++, N = !0);
        }
        if (L > x) {
          let X = document.createTextNode(u.slice(x, L));
          if (B) {
            let q = d.appendChild(document.createElement("span"));
            q.className = B, q.appendChild(X);
          } else
            d.appendChild(X);
          x = L;
        }
        N && (S = !S);
      }
    }
    if (O && e.toA - e.fromA <= h) {
      let A = O.parser.parse(u), $ = 0;
      Gg(A, { style: (v) => fm(n, v) }, (v, x, L) => {
        v > $ && b($, v, ""), b(v, x, L), $ = x;
      }), b($, u.length, "");
    } else
      b(0, u.length, "");
    return d.firstChild || d.appendChild(document.createElement("br")), f;
  }, s = V.widget({
    block: !0,
    side: -1,
    widget: new VO(r)
  });
  return tc.set(e.changes, s), s;
}
function Ab(n, e) {
  let { state: t } = n, i = e ?? t.selection.main.head, r = n.state.field($e).find((a) => a.fromB <= i && a.endB >= i);
  if (!r)
    return !1;
  let s = n.state.sliceDoc(r.fromB, Math.max(r.fromB, r.toB - 1)), l = n.state.field(ki);
  r.fromB != r.toB && r.toA <= l.length && (s += n.state.lineBreak);
  let o = ie.of({ from: r.fromA, to: Math.min(l.length, r.toA), insert: s }, l.length);
  return n.dispatch({
    effects: Zo.of({ doc: o.apply(l), changes: o }),
    userEvent: "accept"
  }), !0;
}
function Xb(n, e) {
  let { state: t } = n, i = e ?? t.selection.main.head, r = t.field($e).find((o) => o.fromB <= i && o.endB >= i);
  if (!r)
    return !1;
  let l = t.field(ki).sliceString(r.fromA, Math.max(r.fromA, r.toA - 1));
  return r.fromA != r.toA && r.toB <= t.doc.length && (l += t.lineBreak), n.dispatch({
    changes: { from: r.fromB, to: Math.min(t.doc.length, r.toB), insert: l },
    userEvent: "revert"
  }), !0;
}
function ic(n) {
  let e = new Tt();
  for (let t of n.field($e)) {
    let i = n.facet(St).overrideChunk && qO(n, t);
    e.add(t.fromB, t.fromB, Cb(n, t, !!i));
  }
  return e.finish();
}
const Rb = /* @__PURE__ */ Ae.define({
  create: (n) => ic(n),
  update(n, e) {
    return e.state.field($e, !1) != e.startState.field($e, !1) ? ic(e.state) : n;
  },
  provide: (n) => C.decorations.from(n)
}), nc = /* @__PURE__ */ new WeakMap();
function qO(n, e) {
  let t = nc.get(e);
  if (t !== void 0)
    return t;
  t = null;
  let i = n.field(ki), r = n.doc, s = i.lineAt(e.endA).number - i.lineAt(e.fromA).number + 1, l = r.lineAt(e.endB).number - r.lineAt(e.fromB).number + 1;
  e: if (s == l && s < 10) {
    let o = [], a = 0, h = e.fromA, c = e.fromB;
    for (let f of e.changes) {
      if (f.fromA < f.toA) {
        a += f.toA - f.fromA;
        let u = i.sliceString(h + f.fromA, h + f.toA);
        if (/\n/.test(u))
          break e;
        o.push(V.widget({ widget: new Mb(u), side: -1 }).range(c + f.fromB));
      }
      f.fromB < f.toB && o.push(BO.range(c + f.fromB, c + f.toB));
    }
    a < e.endA - e.fromA - s * 2 && (t = o);
  }
  return nc.set(e, t), t;
}
class Mb extends Rt {
  constructor(e) {
    super(), this.text = e;
  }
  eq(e) {
    return this.text == e.text;
  }
  toDOM(e) {
    let t = document.createElement("del");
    return t.className = "cm-deletedText", t.textContent = this.text, t;
  }
}
const Lb = /* @__PURE__ */ new class extends ot {
  constructor() {
    super(...arguments), this.elementClass = "cm-inlineChangedLineGutter";
  }
}(), jb = /* @__PURE__ */ V.line({ class: "cm-inlineChangedLine" });
function Eb(n, e, t, i) {
  let r = qO(n, e), s = 0;
  if (!r)
    return !1;
  for (let l = n.doc.lineAt(e.fromB); ; ) {
    for (i && i.add(l.from, l.from, Lb), t.add(l.from, l.from, jb); s < r.length && r[s].to <= l.to; ) {
      let o = r[s++];
      t.add(o.from, o.to, o.value);
    }
    if (l.to >= e.endB)
      break;
    l = n.doc.lineAt(l.to + 1);
  }
  return !0;
}
const Yb = "md-viewer-drafts", Ut = "active", Ve = "recovery", zb = 20, _b = 720 * 60 * 60 * 1e3;
let Jn = null;
function Co(n) {
  return new Promise((e, t) => {
    n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
  });
}
function Cn(n) {
  return new Promise((e, t) => {
    n.oncomplete = () => e(), n.onerror = () => t(n.error), n.onabort = () => t(n.error);
  });
}
function Ht() {
  return Jn || (Jn = new Promise((n, e) => {
    const t = indexedDB.open(Yb, 1);
    t.onupgradeneeded = () => {
      const i = t.result;
      i.createObjectStore(Ut, { keyPath: "key" }), i.createObjectStore(Ve, { keyPath: "id" }).createIndex("path", "path", { unique: !1 });
    }, t.onsuccess = () => n(t.result), t.onerror = () => e(t.error);
  }), Jn);
}
function Ao(n) {
  return `active:${n}`;
}
async function Wb(n) {
  const t = (await Ht()).transaction(Ut, "readonly");
  return Co(t.objectStore(Ut).get(Ao(n)));
}
async function Bb(n) {
  const t = (await Ht()).transaction(Ut, "readwrite");
  t.objectStore(Ut).put(n), await Cn(t);
}
async function xi(n) {
  const t = (await Ht()).transaction(Ut, "readwrite");
  t.objectStore(Ut).delete(Ao(n)), await Cn(t);
}
function DO(n, e = Date.now()) {
  return n.filter((t) => e - t.timestamp <= _b).sort((t, i) => i.timestamp - t.timestamp).slice(0, zb);
}
async function IO(n) {
  const t = (await Ht()).transaction(Ve, "readonly"), i = await Co(
    t.objectStore(Ve).index("path").getAll(n)
  );
  return DO(i);
}
async function Xo(n) {
  const e = await Ht(), t = e.transaction(Ve, "readonly"), i = await Co(
    t.objectStore(Ve).index("path").getAll(n)
  ), r = new Set(DO(i).map((a) => a.id)), s = i.filter((a) => !r.has(a.id));
  if (!s.length) return;
  const l = e.transaction(Ve, "readwrite"), o = l.objectStore(Ve);
  for (const a of s) o.delete(a.id);
  await Cn(l);
}
async function GO(n) {
  const t = (await Ht()).transaction(Ve, "readwrite");
  t.objectStore(Ve).put(n), await Cn(t), await Xo(n.path);
}
async function Vb(n) {
  const t = (await Ht()).transaction(Ve, "readwrite");
  t.objectStore(Ve).delete(n), await Cn(t);
}
function fe(n) {
  const e = document.querySelector(n);
  if (!e) throw new Error(`Missing viewer element: ${n}`);
  return e;
}
const H = JSON.parse(fe("#md-bootstrap").textContent || "{}"), Ft = fe("#rendered"), Ro = fe("#raw-view"), NO = fe("#editor-wrap"), zl = fe("#raw-btn"), UO = fe("#edit-btn"), FO = fe("#done-btn"), HO = fe("#cancel-btn"), _l = fe("#theme-btn"), rc = fe("#sync-status"), Ys = fe("#notice"), qb = fe("#recovery-btn"), Db = fe("#recovery-count"), Mo = fe("#recovery-drawer"), Ib = fe("#recovery-close"), zs = fe("#recovery-list"), Ii = fe("#recovery-compare");
let Zi = H.revision, Qe = H.source, sc = H.rendered_html, pt = H.exists !== !1, Jr = "rendered", he = null, Me = null, F = !1, Wl = !1, se = null, er = 0, tr = null, _s = null, Ws = null, _i = null, Sn = null, lc = Promise.resolve();
const Qn = /* @__PURE__ */ new Map(), Gb = crypto.randomUUID();
function qe(n) {
  const e = n === "file-missing" ? "file missing" : n;
  rc.textContent = e, rc.dataset.state = n;
}
function wi() {
  pt ? !se || se.readyState !== WebSocket.OPEN ? qe("reconnecting") : qe(F ? "editing" : "saved") : qe("file-missing");
}
function bn(n) {
  Ys.textContent = n, Ys.hidden = !1, Ws !== null && window.clearTimeout(Ws), Ws = window.setTimeout(() => {
    Ys.hidden = !0;
  }, 5e3);
}
function es(n) {
  Jr = n, Ft.style.display = n === "rendered" ? "block" : "none", Ro.style.display = n === "raw" ? "block" : "none", NO.style.display = n === "edit" ? "block" : "none", zl.hidden = n === "edit", UO.hidden = n === "edit", FO.hidden = n !== "edit", HO.hidden = n !== "edit", zl.textContent = n === "raw" ? "rendered" : "raw", n === "edit" && wi();
}
const KO = "h1,h2,h3,h4,h5,h6,p,li,pre,td,blockquote";
function Nb() {
  if (Jr !== "rendered") return null;
  const n = [...Ft.querySelectorAll(KO)], e = n.findIndex((i) => i.getBoundingClientRect().bottom > 0);
  if (e < 0) return null;
  const t = n[e];
  return { index: e, text: (t.textContent || "").trim().slice(0, 80), top: t.getBoundingClientRect().top };
}
function Ub(n) {
  n && requestAnimationFrame(() => {
    const e = [...Ft.querySelectorAll(KO)], i = e.find((r) => (r.textContent || "").trim().startsWith(n.text)) || e[n.index];
    i && window.scrollBy(0, i.getBoundingClientRect().top - n.top);
  });
}
function JO() {
  var n, e;
  try {
    (n = window.renderMathInElement) == null || n.call(window, Ft, {
      delimiters: [
        { left: "$$", right: "$$", display: !0 },
        { left: "$", right: "$", display: !1 },
        { left: "\\(", right: "\\)", display: !1 },
        { left: "\\[", right: "\\]", display: !0 }
      ]
    }), (e = window.Prism) == null || e.highlightAllUnder(Ft);
  } catch (t) {
    console.warn("Markdown enhancement failed", t);
  }
}
function Lo(n) {
  !he || he.state.doc.toString() === n || (Wl = !0, he.dispatch({
    changes: { from: 0, to: he.state.doc.length, insert: n },
    annotations: ee.addToHistory.of(!1)
  }), Wl = !1);
}
function ir(n, e) {
  const t = Nb();
  Zi = n.revision, Qe = n.source, sc = n.rendered_html, n.exists !== void 0 && (pt = n.exists), Ft.innerHTML = sc, Ro.textContent = Qe, JO(), Ub(t), e && Lo(Qe);
}
function ts() {
  return (he == null ? void 0 : he.state.doc.toString()) ?? Qe;
}
function Fb() {
  return [
    vg(),
    Tm(),
    PO(),
    C.lineWrapping,
    Ir.of([
      {
        key: "Mod-s",
        preventDefault: !0,
        run: () => (zr(), !0)
      },
      ...X0,
      ...Em
    ]),
    C.updateListener.of((n) => {
      !n.docChanged || Wl || (F = n.state.doc.toString() !== Qe, wi(), F ? Kb() : xi(H.path));
    })
  ];
}
function Hb(n = Qe) {
  return he || (he = new C({
    state: z.create({ doc: n, extensions: Fb() }),
    parent: NO
  }), he.dom.addEventListener("focusout", () => {
    window.setTimeout(() => {
      he && !he.hasFocus && F && zr();
    }, 0);
  }), he);
}
function An(n) {
  const e = Hb(n ?? Qe);
  n !== void 0 && Lo(n), es("edit"), e.focus();
}
function Kb() {
  _s !== null && window.clearTimeout(_s), _s = window.setTimeout(() => void Ci(), 250);
}
async function Ci() {
  if (!F) return;
  const n = {
    key: Ao(H.path),
    path: H.path,
    baseRevision: Zi,
    baseSource: Qe,
    source: ts(),
    updatedAt: Date.now()
  };
  await Bb(n);
}
async function Jb(n) {
  F && (await GO({
    id: crypto.randomUUID(),
    path: H.path,
    baseRevision: Zi,
    baseSource: Qe,
    source: ts(),
    diskSource: n,
    timestamp: Date.now()
  }), await xi(H.path), await jo());
}
async function nr(n) {
  if (!(!n.revision || typeof n.source != "string")) {
    if (F && n.revision === Zi) {
      ir(n, !1);
      return;
    }
    if (F && Sn !== null && n.source === Sn) {
      ir(n, !1), F = ts() !== n.source, F ? await Ci() : await xi(H.path), wi();
      return;
    }
    F ? (await Jb(n.source), ir(n, !0), F = !1, bn("External changes applied; draft preserved")) : ir(n, !0), wi();
  }
}
function ey() {
  const n = new URL("/ws", window.location.href);
  return n.protocol = n.protocol === "https:" ? "wss:" : "ws:", n.search = new URLSearchParams({
    path: H.path,
    token: H.token,
    client_id: Gb
  }).toString(), n.toString();
}
function ed() {
  tr !== null && (window.clearTimeout(tr), tr = null), se = new WebSocket(ey()), se.addEventListener("open", () => {
    er = 0, wi();
  }), se.addEventListener("message", (n) => {
    lc = lc.then(() => ty(JSON.parse(String(n.data)))).catch((e) => console.error("Synchronization message failed", e));
  }), se.addEventListener("close", () => {
    se = null, F && Ci();
    for (const e of Qn.values()) e.resolve(!1);
    Qn.clear(), Sn = null, qe(pt ? "reconnecting" : "file-missing");
    const n = Math.min(5e3, 250 * 2 ** er);
    er = Math.min(er + 1, 6), tr = window.setTimeout(ed, n);
  }), se.addEventListener("error", () => se == null ? void 0 : se.close());
}
async function ty(n) {
  const e = n.type;
  if (e === "snapshot" || e === "document_changed") {
    await nr(n);
    return;
  }
  if (e === "file_state") {
    n.state === "missing" ? (pt = !1, qe("file-missing")) : n.state === "recovered" && (pt = !0, typeof n.revision == "string" && await nr(n), bn("File recovered at its original path"));
    return;
  }
  if (e === "save_result") {
    const t = String(n.request_id || ""), i = Qn.get(t);
    if (!i) return;
    if (n.accepted === !0)
      await nr(n), i.resolve(!0);
    else {
      const r = n.snapshot;
      r && await nr(r), n.reason === "file_missing" && (pt = !1, qe("file-missing")), i.resolve(!1);
    }
    Qn.delete(t), Sn = null;
  }
}
async function zr() {
  if (!F) return !0;
  if (_i) return _i;
  if (!pt || !se || se.readyState !== WebSocket.OPEN)
    return await Ci(), qe(pt ? "reconnecting" : "file-missing"), !1;
  const n = ts(), e = crypto.randomUUID();
  Sn = n, qe("saving"), _i = new Promise((i) => {
    Qn.set(e, { source: n, resolve: i }), se == null || se.send(JSON.stringify({
      type: "save",
      request_id: e,
      base_revision: Zi,
      source: n
    }));
  }).finally(() => {
    _i = null;
  });
  const t = await _i;
  return wi(), t;
}
async function jo() {
  await Xo(H.path);
  const n = await IO(H.path);
  Db.textContent = n.length ? String(n.length) : "";
}
function iy(n) {
  if (navigator.clipboard) return navigator.clipboard.writeText(n);
  const e = document.createElement("textarea");
  return e.value = n, document.body.append(e), e.select(), document.execCommand("copy"), e.remove(), Promise.resolve();
}
function ny(n) {
  const e = new Blob([n.source], { type: "text/markdown;charset=utf-8" }), t = URL.createObjectURL(e), i = document.createElement("a");
  i.href = t, i.download = `${H.path.split("/").pop() || "draft"}.recovered.md`, i.click(), URL.revokeObjectURL(t);
}
function Gi(n, e) {
  const t = document.createElement("button");
  return t.type = "button", t.textContent = n, t.addEventListener("click", () => void e()), t;
}
async function ry(n) {
  Me == null || Me.destroy(), Ii.replaceChildren();
  const e = document.createElement("div");
  e.className = "recovery-actions", e.append(
    Gi("Copy Draft", async () => {
      await iy(n.source), bn("Draft copied");
    }),
    Gi("Download Draft", () => ny(n)),
    Gi("Restore to Editor", async () => {
      window.confirm("Restore this draft against the current disk revision? It will not be written until you save.") && (Mo.hidden = !0, An(n.source), F = n.source !== Qe, qe(F ? "editing" : "saved"), F && await Ci());
    }),
    Gi("Delete Draft", async () => {
      await Vb(n.id), Me == null || Me.destroy(), Me = null, Ii.replaceChildren(), await td(), await jo();
    })
  ), Ii.append(e);
  const t = document.createElement("div");
  Ii.append(t), Me = new C({
    state: z.create({
      doc: n.source,
      extensions: [
        PO(),
        C.lineWrapping,
        z.readOnly.of(!0),
        C.editable.of(!1),
        Zb({ original: Qe, mergeControls: !1 })
      ]
    }),
    parent: t
  });
}
async function td() {
  const n = await IO(H.path);
  if (zs.replaceChildren(), !n.length) {
    const e = document.createElement("p");
    e.className = "recovery-empty", e.textContent = "No recovered drafts for this file.", zs.append(e);
    return;
  }
  for (const e of n) {
    const t = document.createElement("div");
    t.className = "recovery-entry";
    const i = document.createElement("span");
    i.textContent = new Date(e.timestamp).toLocaleString();
    const r = Gi("Compare", () => ry(e));
    t.append(i, r), zs.append(t);
  }
}
async function sy() {
  const n = await Wb(H.path);
  if (!n || n.source === Qe) {
    n && await xi(H.path);
    return;
  }
  if (n.baseRevision === Zi) {
    An(n.source), F = !0, qe("editing"), bn("Unsaved draft restored");
    return;
  }
  await GO({
    id: crypto.randomUUID(),
    path: H.path,
    baseRevision: n.baseRevision,
    baseSource: n.baseSource,
    source: n.source,
    diskSource: Qe,
    timestamp: n.updatedAt
  }), await xi(H.path), bn("External changes applied; draft preserved");
}
zl.addEventListener("click", () => es(Jr === "raw" ? "rendered" : "raw"));
UO.addEventListener("click", () => An());
FO.addEventListener("click", async () => {
  await zr() && (F && !await zr() || es("rendered"));
});
HO.addEventListener("click", async () => {
  F && !window.confirm("Discard the active draft? Archived recovery drafts are unaffected.") || (Lo(Qe), F = !1, await xi(H.path), es("rendered"));
});
_l.addEventListener("click", () => {
  const n = document.documentElement, e = n.dataset.theme === "dark" ? "light" : "dark";
  n.dataset.theme = e, _l.textContent = e === "dark" ? "light" : "dark", localStorage.setItem("md-theme", e);
});
qb.addEventListener("click", async () => {
  Mo.hidden = !1, await td();
});
Ib.addEventListener("click", () => {
  Mo.hidden = !0, Me == null || Me.destroy(), Me = null, Ii.replaceChildren();
});
Ft.addEventListener("dblclick", () => An());
document.addEventListener("keydown", (n) => {
  n.metaKey || n.ctrlKey || n.altKey || he != null && he.hasFocus || n.key === "e" && Jr !== "edit" && (n.preventDefault(), An());
});
const rr = localStorage.getItem("md-theme");
(rr === "dark" || rr === "light") && (document.documentElement.dataset.theme = rr, _l.textContent = rr === "dark" ? "light" : "dark");
Ro.textContent = Qe;
window.addEventListener("load", JO);
window.addEventListener("offline", () => {
  F && Ci(), qe(pt ? "reconnecting" : "file-missing"), se == null || se.close();
});
(async () => (await Xo(H.path), await sy(), await jo(), ed()))();
