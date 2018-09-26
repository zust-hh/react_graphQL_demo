const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    isOutputType
} = require('graphql')

const mongoose = require('mongoose')
const Info = mongoose.model('Info')

// 定义日期时间 类型
const objType = new GraphQLObjectType({
    name: 'mete',
    fields: {
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }
})

// 定义Info的数据类型
const InfoType = new GraphQLObjectType({
    name: 'Info',
    fields: {
        _id: {
            type: GraphQLID
        },
        height: {
            type: GraphQLString
        },
        weight: {
            type: GraphQLString
        },
        hobby: {
            type: new GraphQLList(GraphQLString)
        },
        meta: {
            type: objType
        }
    }
})

// 批量查询
exports.infos = {
    type: new GraphQLList(InfoType),
    args: {},
    resolve (root, params, options) {
        return Info.find({}).exec()
    }
}

// 根据id查询单条info记录
exports.info = {
    type: InfoType,
    // 传进来的参数
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID) // 参数不为空
        }
    },
    resolve (root, params, options) {
        return Info.findOne({ _id: params.id }).exec()  // 查询单条数据
    }
}

exports.InfoType = InfoType