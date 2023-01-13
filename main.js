const shoppingCart = []

const hireServices = (servicesList) => {
    let serviceName = ''
    let serviceMonths = 0
    let otherService = false

    do {
        serviceName = prompt('¿Qué servicio deseas contratar?'+'\n\n'+servicesList.join('\n'))
        serviceMonths = parseInt(prompt('¿Durante cuantos meses deseas contratarlo?'))

        const service = services.find(service => service.name.toLowerCase() === serviceName.toLowerCase())

        if (service) {
            addToChart(service, service.id, serviceMonths)
        } else {
            alert('El servicio solicitado no se encuentra disponible! Por favor ingrese un servicio que se encuentre disponible.')
        } 

        otherService = confirm('Desea contratar otro serivicio mas?')
    } while (otherService);

    confirmPurchase()
};

const addToChart = (service, serviceId, serviceMonths) => {
    const repeatedService = shoppingCart.find(service => service.id === serviceId)
    if (!repeatedService) {
        service.months += serviceMonths
        shoppingCart.push(service)
    } 
};
 
const confirmPurchase = () => {
    const serviceList = shoppingCart.map(service => {
        return "Servicio a contratar: " +service.name+' | '+'Cantidad de meses a contratar: '+service.months
    })

    const checkout = confirm('Cuenta total: '
        +'\n\n'+serviceList.join('\n')
        +'\n\nSi desea continuar con la compra presione "Aceptar", si desea cancelarla presione "Cancelar".'
    )

    if (checkout) {
        finishShopping(serviceList)
    }
};

const finishShopping = (serviceList) => {
    const totalMonths = shoppingCart.reduce((cur, item) => cur + item.months, 0)
    const totalPrice = shoppingCart.reduce((cur, item) => cur + (item.price * item.months), 0)
    alert('Resumen de su compra: '
    +'\n\n'+serviceList.join('\n')
    +'\n\nTotal de meses contratados: '+totalMonths
    +'\n\nEl precio total de su compra es: $'+totalPrice
    )
};

const orderedList = () => {
    const servicesList = services.map(service => {
        return '- '+service.name+' $'+service.price
    })
    hireServices(servicesList)
};

const purchase = () => {
    const orderedListServices = confirm('¿Deseas ver la lista de servicios disponibles?')

    if (orderedListServices) {
        orderedList()
    }
};

purchase()