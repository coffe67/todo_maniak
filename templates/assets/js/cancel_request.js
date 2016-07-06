function request_cancelation(order_id, user_id, server){

    $.ajax({
            type: 'PUT',
            url: 'http://'+server+'/api/v1/cancel-services/'+order_id,
            data: {
                'user_id': user_id,
                'delivery_status': 'Cancelado'
            },
            dataType:'json',
            success: function(response) {
                //debugger;
                window.location.replace('http://'+server+'/empresas/servicios')
            },

            error: function(data) {
                $("#btn-submit").attr("disabled", false);
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('alert alert-danger alert-dismissible');

                // Set the message text.
                if (data.responseText !== '') {

                    errors = data.responseJSON
                    txt_response = ''
                    //debugger;
                    if (errors instanceof Array){
                        errors = errors[0]
                    }
                    for (k in errors){
                        if (k === 'items'){
                          txt_response += ('Quiero que:  ' + errors[k])
                        }else if(k == 'card_token'){
                          txt_response += ('Metodo de pago:' + errors[k])
                        }
                        else{
                          txt_response += errors['error']
                        }

                    }
                    //debugger;
                    $(formMessages).text(txt_response);
                } else {
                    $(formMessages).text('Oops! El servicio no puedo ser generado, intenta en unos segundos.');
                }
            }
        })
}

    // Get the form.
    var form = $('#request_service');

    // Get the messages div.
    var formMessages = $('#form-messages');
    var server = $('#srv').val();
    var user_id = $('#usr_id').val();

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();
        $("#btn-submit").attr("disabled", true);
        //debugger;
        $.ajax({
            type: 'POST',
            url: 'http://'+server+'/api/v1/services/'+user_id,
            data: formData,
            dataType:'json',
            success: function(response) {
                //debugger;
                window.location.replace('http://'+server+'/empresas/servicios/detalle/'+response[0].order_code)
            },

            error: function(data) {
                $("#btn-submit").attr("disabled", false);
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('alert alert-danger alert-dismissible');

                // Set the message text.
                if (data.responseText !== '') {

                    errors = data.responseJSON
                    txt_response = ''
                    //debugger;
                    if (errors instanceof Array){
                        errors = errors[0]
                    }
                    for (k in errors){
                        if (k === 'items'){
                          txt_response += ('Quiero que:  ' + errors[k])
                        }else if(k == 'card_token'){
                          txt_response += ('Metodo de pago:' + errors[k])
                        }
                        else{
                          txt_response += errors['error']
                        }

                    }
                    //debugger;
                    $(formMessages).text(txt_response);
                } else {
                    $(formMessages).text('Oops! El servicio no puedo ser generado, intenta en unos segundos.');
                }
            }
        })

    });


