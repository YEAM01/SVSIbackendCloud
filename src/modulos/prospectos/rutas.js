const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')


const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/existe',existe);
router.post('/', agregar);

router.put('/', eliminar)

async function todos(req, res, next) {

    try {
        const items = await controlador.todos();
        items.forEach(element => {
            element.Fecha_registro =element.Fecha_registro.toISOString().split('T')[0];
        });
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};

async function existe(req, res, next) {
    try {
        const items = await controlador.existe(req.body);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);

    }
};

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        items[0].Fecha_registro =items[0].Fecha_registro.toISOString().split('T')[0];
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);

    }
};

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);

        if (req.body.idProspectos == 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito';
        }

        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado', 200);
    } catch (error) {
        next(error);
    }
};
module.exports = router;