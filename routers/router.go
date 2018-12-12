package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/wrzfeijianshen/goforum/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/btn", &controllers.BtnController{})
	beego.Router("/btnGet1", &controllers.BtnGet1Controller{})

	beego.Get("/btnGet2", func(ctx *context.Context) {
		//ctx.Output.Body([]byte("127.0.0.1:8080:/btn"))
		ctx.Output.Body([]byte("client://btnGet/?param=%7B%22target_url%22%3A%22https%3A%2F%2Fwb.lejent.cn%2Fweb%2Ffudao%2Fpc%2F170710%2Fplayback.html%3FtutorRecordId%3D67824070%22%7D"))

	})

	beego.Any("/btnGet", func(ctx *context.Context) {
		ctx.Output.Body([]byte("fjs.com://btnGet/?param=%7B%22target_url%22%3A%22https%3A%2F%2Fwb.lejent.cn%2Fweb%2Ffudao%2Fpc%2F170710%2Fplayback.html%3FtutorRecordId%3D67824070%22%7D"))
	})
}
