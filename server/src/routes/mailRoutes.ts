import { Router } from 'express';
import transporter from '../mailer';

import mailsControllers from '../controllers/mailControllers';

class MailRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/', (req) => {
            // configura los datos del correo
            var mailOptions = {
                from: 'softwaremarbal_soporte@outlook.com',
                to: req.body.Mail,
                subject: 'Estado de su orden',               
                html: "<html>"+
                '<h3>El estado de su orden a sido cambiado a ' + req.body.Estado + ', recuerde que la fecha de retiro estimada es ' + req.body.FechaRetiro + '.</h3>'+
                "<h3>¡Muchas gracias!</h3>"+               
                "</html>",
            };
            // Envía el correo con el objeto de transporte definido anteriormente
            transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    return console.log(error);
                }
                console.log('Mensaje enviado: ' + info.response);                
            });
        })

        this.router.post('/recuperarpass', mailsControllers.recuperarPass);

        this.router.get('/obtenerMail/:Mail', mailsControllers.GetPass);

        this.router.post('/enviarwsp', mailsControllers.enviarWsp);
    }
}


const mailRoutes = new MailRoutes();
export default mailRoutes.router;