# scss编写规范

## 原则

## 结构
+ 层级不超过3级
+ 属性根据类型排序
```
@extend  
@include 

/*定位*/
/*盒子类型*/
/*尺寸、颜色控制*/
/*字体设置*/
/*阴影设置*/

/*伪类*/
```
### 选择器
+ 不使用ID选择器
+ 避免元素选择器和Class叠加使用


## 命名规则

##### 基本规则
+ m前缀表示公共
+ 类名使用‘-’连接
+ 常量大写；局部常量加下划线前缀
##### 目录命名
+ 样式文件夹:css
+ 脚本文件夹:js
+ 样式类图片文件夹:img

##### 图片命名
+ (m_)图片功能类别(必选)+ 图片模块名称(可选) + 图片精度(可选)
+ 【图片功能类别】
  
  icon:模块类固化的图标
  
  logo:LOGO类
  
  spr:单页面各种元素合并集合
  
  btn:按钮
  
  bg:可平铺或者大背景
  
  pic :表示当前内容或业务的图片
  
  【图片模块名称】
  
  goodslist:商品列表
  
  goodsinfo:商品信息
  
  userportrait:用户头像
  
  【图片精度】
  
  普清:@1x
  
  Retina:@2x | @3x
 

## 注释
+ 通用类注释作用

