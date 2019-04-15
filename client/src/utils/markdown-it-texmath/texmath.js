/*eslint-disable */
'use strict'; var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) { return typeof a } : function (a) { return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a }; function texmath(a, b) { var c = b && b.delimiters || 'dollars'; if (c in texmath.rules) { var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0; try { for (var e, _loop = function () { var h = e.value; a.inline.ruler.before('escape', h.name, texmath.inline(h)), a.renderer.rules[h.name] = function (i, j) { return h.tmpl.replace(/\$1/, texmath.render(i[j].content, !1)) } }, d = texmath.rules[c].inline[Symbol.iterator](); !(_iteratorNormalCompletion = (e = d.next()).done); _iteratorNormalCompletion = !0)_loop() } catch (h) { _didIteratorError = !0, _iteratorError = h } finally { try { !_iteratorNormalCompletion && d.return && d.return() } finally { if (_didIteratorError) throw _iteratorError } } var _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0; try { for (var g, _loop2 = function () { var h = g.value; a.block.ruler.before('fence', h.name, texmath.block(h)), a.renderer.rules[h.name] = function (i, j) { return h.tmpl.replace(/\$2/, i[j].info).replace(/\$1/, texmath.render(i[j].content, !0)) } }, f = texmath.rules[c].block[Symbol.iterator](); !(_iteratorNormalCompletion2 = (g = f.next()).done); _iteratorNormalCompletion2 = !0)_loop2() } catch (h) { _didIteratorError2 = !0, _iteratorError2 = h } finally { try { !_iteratorNormalCompletion2 && f.return && f.return() } finally { if (_didIteratorError2) throw _iteratorError2 } } } } texmath.applyRule = function (a, b, c) { var d, e, f; return a.rex.lastIndex = c, d = b.startsWith(a.tag, c) && (!a.pre || a.pre(b, c)), e = d && a.rex.exec(b), e && (e.lastIndex = a.rex.lastIndex, f = !a.post || a.post(b, e.lastIndex - 1)), a.rex.lastIndex = 0, f && e }, texmath.inline = function (a) { return function (b, c) { var d = texmath.applyRule(a, b.src, b.pos); if (d) { if (!c) { var e = b.push(a.name, 'math', 0); e.content = d[1], e.markup = a.tag } b.pos = d.lastIndex } return !!d } }, texmath.block = function (a) { return function (b, c, d, e) { var f = texmath.applyRule(a, b.src, b.bMarks[c] + b.tShift[c]); if (f) { if (!e) { var g = b.push(a.name, 'math', 0); g.block = !0, g.content = f[1], g.info = f[2], g.markup = a.tag } for (var h = c, i = f.lastIndex - 1; h < d; h++)if (i >= b.bMarks[h] && i <= b.eMarks[h]) { b.line = h + 1; break } b.pos = f.lastIndex } return !!f } }, texmath.render = function (a, b) { var c; try { c = texmath.katex.renderToString(a, { throwOnError: !1, displayMode: b }) } catch (d) { c = a + ': ' + d.message.replace('<', '&lt;') } return c }, texmath.use = function (a) { return texmath.katex = a, texmath }, texmath.$_pre = function (a, b) { var c = !!(0 < b) && a[b - 1].charCodeAt(0); return !c || 92 !== c && (48 > c || 57 < c) }, texmath.$_post = function (a, b) { var c = a[b + 1] && a[b + 1].charCodeAt(0); return !c || 48 > c || 57 < c }, texmath.rules = { brackets: { inline: [{ name: 'math_inline', rex: /\\\((.+?)\\\)/gy, tmpl: '<eq>$1</eq>', tag: '\\(' }], block: [{ name: 'math_block_eqno', rex: /\\\[\s*?(.+?)\\\]\s*?\(([^)$\r\n]+?)\)/gmy, tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>', tag: '\\[' }, { name: 'math_block', rex: /\\\[(.+?)\\\]/gmy, tmpl: '<section><eqn>$1</eqn></section>', tag: '\\[' }] }, gitlab: { inline: [{ name: 'math_inline', rex: /\$`(.+?)`\$/gy, tmpl: '<eq>$1</eq>', tag: '$`' }], block: [{ name: 'math_block_eqno', rex: /`{3}math\s+?([^`]+?)\s+?`{3}\s*?\(([^)$\r\n]+?)\)/gmy, tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>', tag: '```math' }, { name: 'math_block', rex: /`{3}math\s+?([^`]+?)\s+?`{3}/gmy, tmpl: '<section><eqn>$1</eqn></section>', tag: '```math' }] }, dollars: { inline: [{ name: 'math_inline', rex: /\$(\S[^$\r\n]*?[^\s\\]{1}?)\$/gy, tmpl: '<eq>$1</eq>', tag: '$', pre: texmath.$_pre, post: texmath.$_post }, { name: 'math_single', rex: /\$([^$\s\\]{1}?)\$/gy, tmpl: '<eq>$1</eq>', tag: '$', pre: texmath.$_pre, post: texmath.$_post }], block: [{ name: 'math_block_eqno', rex: /\${2}([^$]*?)\${2}\s*?\(([^)$\r\n]+?)\)/gmy, tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>', tag: '$$' }, { name: 'math_block', rex: /\${2}([^$]*?)\${2}/gmy, tmpl: '<section><eqn>$1</eqn></section>', tag: '$$' }] } }, 'object' === ('undefined' == typeof module ? 'undefined' : _typeof(module)) && module.exports && (module.exports = texmath);