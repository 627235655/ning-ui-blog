#!/bin/bash

xpmPublish(){
    echo "切换发布源 xpm-publish 开始..."

    xp2 repo -s xpm-publish

    echo "切换发布源 xpm-publish 结束！"

    echo "发布 pp 环境开始..."

    npm run pp

    echo "发布 pp 环境结束！"

    echo "发布 prod 环境开始..."

    npm run publish

    echo "发布 prod 环境结束！请于 feps 发布上线~"
}

uatXpmPublish(){
    echo "切换发布源 uat_xpm-publish 开始..."

    xp2 repo -s uat_xpm-publish

    echo "切换发布源 uat_xpm-publish 结束！"

    echo "发布 uat 环境开始..."

    npm run publish

    echo "发布 uat 环境结束！请于 feps 发布后继续操作~"
}

main(){
    echo "打包线上代码开始..."

    npm run build:publish

    echo "打包线上代码结束！"

    uatXpmPublish

    read -r -p "请确认于feps 发布 uat 是否成功？[y/n]" input

    case $input in
        [yY][eE][sS]|[yY])
            echo "Yes"
            xpmPublish
            ;;
        [nN][oO]|[nN])
            echo "No"
            echo "发布失败，请检查代码后重新执行此脚本~"
            ;;
        *)
    esac
}

read -r -p "请确认代码是否已提交完成？[y/n]" canOnline

case $canOnline in
    [yY][eE][sS]|[yY])
        echo "Yes"
        main
        ;;
    [nN][oO]|[nN])
        echo "No"
        echo "请确认代码是否已提交完成？"
        ;;
    *)
esac

