const gulp=require("gulp")
const gulpCss=require("gulp-sass")
const webserver=require("gulp-webserver")
gulp.task("devScc",()=>{
    return gulp.src("./src/scss/**/*.scss")
    .pipe(gulpCss())
    .pipe(gulp.dest("./src/css"))
})
gulp.task("watch",()=>{
    gulp.watch("./src/scss/**/*.scss",gulp.series("devScc"))
})
gulp.task("sever",()=>{
    return gulp.src("./src")
    .pipe(webserver({
        port:2225,
        open:true,
        livereload:true,
        proxies:[
            {
                source:"/getList",
                target:"http://localhost:3000/getList"
            },
            {
                source:"/addList",
                target:"http://localhost:3000/addList"
            },
            {
                source:"/delList",
                target:"http://localhost:3000/delList"
            },
            {
                source:"/upList",
                target:"http://localhost:3000/upList"
            },
            {
                source:"/upData",
                target:"http://localhost:3000/upData"
            },
            {
                source:"/newData",
                target:"http://localhost:3000/newData"
            }
        ]
    }))
})
gulp.task("dev",gulp.series("devScc","sever","watch"))
