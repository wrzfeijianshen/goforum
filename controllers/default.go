package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "index.html"
}

type ExamController struct {
	beego.Controller
}

type BtnController struct {
	beego.Controller
}

func (c *ExamController) Get() {
	log := logs.NewLogger(10000)  // 创建一个日志记录器，参数为缓冲区的大小
	log.SetLogger("console", "")  // 设置日志记录方式：控制台记录
	log.SetLevel(logs.LevelDebug) // 设置日志写入缓冲区的等级：Debug级别（最低级别，所以所有log都会输入到缓冲区）
	log.EnableFuncCallDepth(true) // 输出log时能显示输出文件名和行号（非必须）

	// log.Emergency("Emergency")
	// log.Alert("Alert")
	// log.Critical("Critical")
	// log.Error("Error")
	// log.Warning("Warning")
	// log.Notice("Notice")
	// log.Informational("Informational")
	log.Debug("GET")

	log.Close()
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "exam.html"
}

func (c *BtnController) Get() {
	log := logs.NewLogger(10000)  // 创建一个日志记录器，参数为缓冲区的大小
	log.SetLogger("console", "")  // 设置日志记录方式：控制台记录
	log.SetLevel(logs.LevelDebug) // 设置日志写入缓冲区的等级：Debug级别（最低级别，所以所有log都会输入到缓冲区）
	log.EnableFuncCallDepth(true) // 输出log时能显示输出文件名和行号（非必须）

	// log.Emergency("Emergency")
	// log.Alert("Alert")
	// log.Critical("Critical")
	// log.Error("Error")
	// log.Warning("Warning")
	// log.Notice("Notice")
	// log.Informational("Informational")
	log.Debug("GET")

	log.Close()
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "btn.html"
}

type user struct {
	Name string `form:"username"` //对应表单中的name值,字段名首字母也必须大写，否则无法解析该参数的值
	ID   string `form:"id"`
	ID1  string `form:"id1"`
}

func (this *BtnController) Post() {
	log := logs.NewLogger(10000)  // 创建一个日志记录器，参数为缓冲区的大小
	log.SetLogger("console", "")  // 设置日志记录方式：控制台记录
	log.SetLevel(logs.LevelDebug) // 设置日志写入缓冲区的等级：Debug级别（最低级别，所以所有log都会输入到缓冲区）
	log.EnableFuncCallDepth(true) // 输出log时能显示输出文件名和行号（非必须）
	log.Debug("aaaaaaaaaaaa")

	u := user{}
	if err := this.ParseForm(&u); err != nil {
		//handle error
		this.TplName = "500.html"

	}
	if u.Name != "" && u.ID != "" && u.ID1 != "" {
		log.Debug(u.Name)
		this.TplName = "btnPost.html"
	} else {
		log.Debug("Name is null")
		this.TplName = "btn.html"
	}

	log.Close()

}

type GetBtnController struct {
	beego.Controller
}

func (c *GetBtnController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "btnGet.html"
}

type BtnGet1Controller struct {
	beego.Controller
}

func (c *BtnGet1Controller) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "btnGet.html"

}

type BtnClickController struct {
	beego.Controller
}

func (c *BtnClickController) Get() {
	c.TplName = "btn.html"
}
