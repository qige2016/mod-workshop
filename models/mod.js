const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize

class Mod extends Model {

    /**
     * @description: 添加mod
     * @param {*} name
     * @param {*} version
     * @param {*} tags
     * @param {*} uri
     * @param {*} description
     * @param {*} poster
     * @return {*} 返回添加的数据
     */
    static async createMod({ name, version, tags, uri, description, poster }) {
        return await this.create({
            name,
            version,
            tags,
            uri,
            description,
            poster
        })
    }

    /**
     * @description: 根据id删除mod
     * @param {*} id
     * @return {*} 
     */    
    static async deleteById(id){
        return await this.destroy({
            where: {
                id
            }
        })
    }

}
// 初始化表结构
Mod.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING
        },
        uri: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        poster: {
            type: DataTypes.STRING
        },
        pass: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createDate: {
            type: DataTypes.DATE,
            field: 'create_date'
        },
        updateDate: {
            type: DataTypes.DATE,
            field: 'update_date'
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: false, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "mod表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
    // modelName: 'Admin', // 我们需要选择模型名称
    // tableName: 'Admin'  // 表名
}
)

    // 创建表格
    ; (async () => {
        await Mod.sync();
        console.log("Mod表刚刚(重新)创建！");
        // 这里是代码
    })()
// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true
module.exports = Mod