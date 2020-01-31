var fs = require('./myfs');
extractOverviewInfo = (md_data, id) => {
    var data = md_data.split('---');
    console.log('data', data.length);
    var overview_info = data[1].split('\n');
    overview_info = overview_info.slice(1, overview_info.length-1);
    var overview_info_str = "{";
    for (var i = 0; i < overview_info.length; i++) {
        let str = overview_info[i];
        let index = str.indexOf(':');
        console.log(str.slice(index+1, str.length));
        str = '"' + str.slice(0, index) + '":' + '"' + str.slice(index+1, str.length).trim() + '"';
        overview_info_str += str;
        console.log(str);
        if (i != overview_info.length-1) {
            overview_info_str += ",";
        }
    }
    overview_info_str += "}";
    console.log(overview_info_str)
    console.log(JSON.parse(overview_info_str.toString()))
    overview_info = JSON.parse(overview_info_str.toString());
    overview_info.id = id;
    console.log(overview_info);
    return {
        overview: overview_info,
        content: data[2]
    }
}
module.exports = {
    getBlogCount: () => {
        return fs.readdir('./_posts').then(data => {
            return data.length;   
        })
    },
    getCategoryCount: () => {

    },
    getTagCount: () => {

    },
    extractMarkdownFileById: (id) => {
        return fs.readdir('./_posts/' + id).then(files => {
            var i;
            for (i = 0; i < files.length; i++) {
                if (!fs.isDirectory('./_posts/' + id + '/' + files[i])) break;
            }
            return files[i];
        }).then(filename => {
            return fs.readFile('./_posts/' + id + '/' + filename)
        }).then(data => {
            return extractOverviewInfo(data, id);
        })
    },
    getAllOverviewsInfo: () => {
        return fs.readdir('./_posts').then(ids => {
            var md_datas = []
            for (var i = 0; i < ids.length; i++) {
                let sub_content = fs.readdirSync('./_posts/' + ids[i]);
                var j;
                for (j = 0; j < sub_content.length; j++) {
                    if (!fs.isDirectory('./_posts/' + ids[i] + '/' + sub_content[j])) break;
                }
                let data = fs.readFileSync('./_posts/' + ids[i] + '/' + sub_content[j]);
                md_datas.push(data);
            }
            return {
                ids: ids,
                md_datas: md_datas
            }
        }).then(data => {
            overviews = []
            for (var i = 0; i < data.ids.length; i++) {
                overviews.push(extractOverviewInfo(data.md_datas[i], data.ids[i]).overview);
            }
            return overviews;
        })
    }
}