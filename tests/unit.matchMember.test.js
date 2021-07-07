const assert = require('chai').assert;
const forEach = require('mocha-each');

const {matchMember} = require('../index');

let taehyungAlias = ["tae", "v", "tete"];

describe('function type check', function() {
    it("checks if it is a function", function() {
        assert.isFunction(matchMember, 'matchMember is a function');
    });
});

describe('match namjoon', function() {
    forEach([
        "namjoon", "namu", "joon", "moni", "rm"
    ]).it("checks if %j matched to namjoon", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "namjoon", `--${alias} isn't matching to namjoon`);
    });
});

describe('match seokjin', function() {
    forEach([
        "seokjin", "jin", "wwh"
    ]).it("checks if %j matched to seokjin", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "seokjin", `--${alias} isn't matching to seokjin`);
    });
});

describe('match yoongi', function() {
    forEach([
        "yoongi", "yoonfi", "suga", "yoon"
    ]).it("checks if %j matched to yoongi", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "yoongi", `--${alias} isn't matching to yoongi`);
    });
});

describe('match hoseok', function() {
    forEach([
        "hoseok", "j-hope", "jhope", "hobi"
    ]).it("checks if %j matched to jimin", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "hoseok", `--${alias} isn't matching to hoseok`);
    });
});

describe('match jimin', function() {
    forEach([
        "jimin", "mini", "jiminie"
    ]).it("checks if %j matched to jimin", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "jimin", `--${alias} isn't matching to jimin`);
    });
});

describe('match jimin', function() {
    forEach([
        "jimin", "mini", "jiminie"
    ]).it("checks if %j matched to jimin", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "jimin", `--${alias} isn't matching to jimin`);
    });
});

describe('match taehyung', function() {
    forEach([
        "taehyung", "tae", "v", "tete"
    ]).it("checks if %j matched to taehyung", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "taehyung", `--${alias} isn't matching to taehyung`);
    });
});

describe('match jungkook', function() {
    forEach([
        "jungkook", "jk", "koo"
    ]).it("checks if %j matched to jungkook", function(alias) {
        let result = matchMember(alias);
        assert.strictEqual(result, "jungkook", `--${alias} isn't matching to jungkook`);

    });
});
