package main

import (
	"github.com/astaxie/beego"
	_ "github.com/wrzfeijianshen/goforum/routers"
)

func main() {
	beego.BeeLogger.DelLogger("console")
	beego.SetLogFuncCall(true)

	beego.Run()
}
