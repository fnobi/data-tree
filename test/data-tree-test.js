var fs = require('fs');
var path = require('path');

var expect = require('chai').expect;
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');

var dataTree = require('..');
var TMP = __dirname + '/.tmp';

describe('data-tree', function () {
    before(function (done) {
        mkdirp(TMP, done);
    });
    
    after(function (done) {
        del(TMP).then(function () {
            done();
        });
    });

    it('load js file', function (done) {
        var jsFilePath = path.join(TMP, 'sample1.js');
        var sampleData = {
            hoge: Math.random(),
            moge: Math.random()
        };
        
        async.waterfall([function (next) {
            fs.writeFile(jsFilePath, [
                'module.exports = ' + JSON.stringify(sampleData) + ';'
            ].join('\n'), 'utf8', next);
        }, function (next) {
            dataTree.load(jsFilePath, next);
        }, function (data, next) {
            expect(data).to.have.property('hoge', sampleData.hoge);
            expect(data).to.have.property('moge', sampleData.moge);
            next();
        }], done);
    });

    it('load json file', function (done) {
        var jsFilePath = path.join(TMP, 'sample2.json');
        var sampleData = {
            hoge: Math.random(),
            moge: Math.random()
        };

        async.waterfall([function (next) {
            fs.writeFile(jsFilePath, [
                JSON.stringify(sampleData)
            ].join('\n'), 'utf8', next);
        }, function (next) {
            dataTree.load(jsFilePath, next);
        }, function (data, next) {
            expect(data).to.have.property('hoge', sampleData.hoge);
            expect(data).to.have.property('moge', sampleData.moge);
            next();
        }], done);
    });

    it('load yaml file', function (done) {
        var jsFilePath = path.join(TMP, 'sample3.yaml');
        var sampleData = {
            hoge: Math.random(),
            moge: Math.random()
        };
        
        async.waterfall([function (next) {
            fs.writeFile(jsFilePath, [
                'hoge: ' + sampleData.hoge,
                'moge: ' + sampleData.moge
            ].join('\n'), 'utf8', next);
        }, function (next) {
            dataTree.load(jsFilePath, next);
        }, function (data, next) {
            expect(data).to.have.property('hoge', sampleData.hoge);
            expect(data).to.have.property('moge', sampleData.moge);
            next();
        }], done);
    });

    it('load yaml file sync', function () {
        var jsFilePath = path.join(TMP, 'sample4.yaml');
        var sampleData = {
            hoge: Math.random(),
            moge: Math.random()
        };
        
        fs.writeFileSync(jsFilePath, [
            'hoge: ' + sampleData.hoge,
            'moge: ' + sampleData.moge
        ].join('\n'), 'utf8');
        var data = dataTree.load(jsFilePath);
        expect(data).to.have.property('hoge', sampleData.hoge);
        expect(data).to.have.property('moge', sampleData.moge);
    });
});
