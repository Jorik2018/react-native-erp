import { defaultOption } from "../utils";

export const returnData = (type: any) => {
  let dataReturn = '';
  switch (type) {
    case 'auth-number':
      dataReturn = numberTermCondition;
      break;
    case 'licencias':
      dataReturn = licencias;
      break;
    default: defaultOption('type', type); break;
  }
  return dataReturn;
};

const numberTermCondition = `
<div class="py-4 pt-4 terms">
  <p><b>TÉRMINOS Y CONDICIONES PORTAL DE TELEFÓNICA DEL PERU S.A.A</b></p>
  <p>Al ingresar al portal de Telefónica del Perú S.A.A, a la página web “Mi Movistar Empresas” o 
  al aplicativo móvil (en adelante, cualquiera de ellos se entenderá como “Canal On line de Telefónica del 
    Perú S.A.A”) el Cliente reconoce haber leído, comprendido y aceptado los Términos y Condiciones 
    que a continuación se listan. </p>
  <p>Los Términos y Condiciones se aplican para acceder en línea desde el Canal On line a: 
  (i) la información relacionada a servicios contratados; (ii) realizar transacciones relacionadas 
  a sus servicios contratados; y/o, (iii) comprar productos o contratar servicios (los “Servicios”). </p>
  <p>Los Términos y Condiciones aplican para Telefónica del Perú S.A.A., y a 
  cualquier empresa que este directa o indirectamente controlada por, sea controlante de, 
  o se encuentre bajo control (incluyendo Marca “Movistar”).</p>
  <p><b>I. Condiciones Generales de Uso para Clientes</b></p>
  <ul>
    <li>
      La afiliación otorgará una contraseña única e intransferible, la misma que será 
      utilizada por el Cliente para ingresar al Canal Online de Telefónica del Perú S.A.A 
      desde cualquier dispositivo. La contraseña será requerida al Cliente para validar el ingreso al 
      Canal Online. Así como para confirmar los requerimientos. 
    </li>
    <li>
      El acceso al Canal Online de Telefónica del Perú S.A.A desde cualquier dispositivo implica el consumo de datos, 
      los mismos que serán consumidos de su plan de datos contratado, salvo que se encuentre en una conexión WIFI. 
    </li>
    <li>
      De encontrarse en el extranjero y utiliza el Canal Online de Telefónica del Perú S.A.A desde una aplicación o
      desde la web móvil, estará realizando consumo de datos de su plan de datos contratado por lo que se le aplicarán 
      costos de transmisión de datos en Roaming de acuerdo a las tarifas vigentes, le recomendamos utilizar una 
      conexión WIFI para evitar costos adicionales. 
     </li>
    <li>
      El Cliente tiene la posibilidad de solicitar la eliminación de su cuenta, previo a un requerimiento enviado 
      por el Representante Legal. Para ello, deberá informarle a su contacto asignado en Telefónica del Perú S.A.A.
    </li>
    <li>
      El cliente reconoce que la plataforma que soporta el Canal Online de Telefónica del Perú S.A.A. no es 
      infalible y, por tanto, puede verificarse circunstancias ajenas a la voluntad de Telefónica del Perú S.A.A, 
      que impliquen que el Canal Online o la plataforma que lo soporta no se encuentran operativos durante un 
      determinado periodo de tiempo. En tales casos Telefónica del Perú S.A.A procurará restablecer el canal Online 
      de Telefónica del Perú S.A.A con la mayor celeridad posible, sin que por ello se le impute algún tipo de 
      responsabilidad. Telefónica del Perú S.A.A no garantiza la disponibilidad y continuidad del funcionamiento 
      del Canal Online de Telefónica del Perú S.A.A y tampoco que, en cualquier momento y tiempo, el cliente o 
      los usuarios puedan acceder a los contenidos de este.
    </li>
    <li>
      Telefónica del Perú S.A.A no responderá de los perjuicios ocasionados al cliente o los usuarios del 
      servicio, provenientes del uso inadecuado de las tecnologías puestas a disposición de éste, cualquier 
      sea la forma en la cual se utilicen inadecuadamente estas tecnologías.
    </li>
  </ul>
  <p>
  <b>II. Consideraciones según dispositivo</b><br>
    Los Clientes registrados con RUC/NIF y registrados con su DNI/Carné de extranjería en el sistema comercial 
    de Telefónica del Perú S.A.A podrán acceder a los Servicios como contactos Administrador Canal Online 
    previa solicitud del Representante Legal. 
  <ul>
    <li>
      El Cliente, a través de su Representante Legal tiene la posibilidad de designar contactos Administrador 
      Canal Online, quienes podrán realizar las acciones que corresponden al cliente, tales como: (i) 
      la información relacionada a servicios contratados; (ii) realizar transacciones relacionadas a 
      sus servicios contratados; y/o (iii) comprar productos o contratar servicios. 
    </li>
    <li>
      El contacto Administrador Canal Online podrá asignar contactos Autorizados Canal Online los 
      cuales tendrán acceso a visualizar información del cliente, también podrá asignar a nivel 
      de la Suscripción (línea) contactos Empleado corporativo, los cuales deberán ser los usuarios 
      finales de las líneas. Estos podrán visualizar información de su línea accediendo al Canal Virtual Residencial.
    </li>
    <li>
      Los contactos Administrador Canal Online no podrán designar a su vez a nuevos contactos Administrador 
      Canal Online pues esta es una facultad que sólo corresponde al Representante Legal.
    </li>
  </ul>
  <br>
  <p><b>III. Términos y Condiciones Legales</b></p>
  <ul>
    <li>
      Telefónica del Perú S.A.A. garantiza la seguridad y confidencialidad en el tratamiento de los datos 
      de carácter personal facilitados por sus Clientes Corporativos, de conformidad con la legislación 
      peruana. En ningún caso Telefónica del Perú S.A.A proporciona información que identifique a sus 
      clientes, sin previa autorización de éstos, salvo para el estricto y único fin de atenderlos de la mejor forma. 
    </li>
    <li>
      Telefónica del Perú S.A.A., garantiza que los datos ingresados y las transacciones realizadas son 
      seguras y permanecen confidenciales e inalterables gracias al Protocolo de Seguridad SSL. 
    </li>
    <li>
      El correo electrónico del contacto Administrador Canal Online debe ser válido y es de exclusiva 
      responsabilidad del Cliente (La Empresa). Telefónica del Perú S.A.A se reserva los derechos de 
      eliminación de cuentas en caso identifique que el correo electrónico registrado es inválido. 
    </li>
    <li>
      Las transacciones que realicen los Clientes implican la aceptación plena y sin reservas de éste y 
      todos los términos y condiciones incluidos en el Aviso Legal de Telefónica del Perú S.A.A., 
      según se encuentren vigentes en el momento mismo en que el cliente acceda al 
      Canal Online de Telefónica del Perú S.A.A. 
    </li>
    <li>
      La solicitud y uso de la contraseña para ingresar al Canal Online de Telefónica del Perú S.A.A 
      es exclusiva responsabilidad del Cliente (La Empresa). Telefónica del Perú S.A. Queda excluida 
      de cualquier responsabilidad por el uso indebido o cualquier acto que pueda perjudicar al cliente
       o a un tercero que se vean afectados directa o indirectamente. 
    </li>
    <li>
      El Cliente acepta que las notificaciones sobre la contratación, cambios y/o terminación de producto(s) 
      y/o servicio(s) contratados sean a través del correo electrónico registrado en el 
      Canal Online de Telefónica del Perú S.A.A. 
    </li>
  </ul>
  <p><b>1. Zona consulta de Saldo: Prepago y Postpago:</b>
  <ul>
    <li>
      El uso de la aplicación está disponible solo para Clientes de celulares Postpago/Prepago Movistar 
      debidamente registrados con su RUC/NIF y registrados con su DNI/Carnet de extranjería en los 
      sistemas comerciales de Telefónica del Perú S.A.A. 
    </li>
    <li>
      A través de esta aplicación el Cliente podrá acceder a consultas de 
      sus Servicio Móviles: línea Postpago y Prepago. 
    </li>
    <li>
      De ingresar por la aplicación móvil (App) cuenta con un sistema de contraseña enviado vía 
      SMS a su línea celular, para brindarle mayor seguridad y de esta manera su información 
      estará protegida. La contraseña requiere actualización cada treinta (30) días, para lo 
      cual el cliente deberá ingresar nuevamente su número de teléfono en el aplicativo y así 
      recibirá vía SMS la nueva contraseña. Esta aplicación es exclusiva para visualizar información de la línea en cuestión. 
    </li>
  </ul>
  <p><b>2. Productos y/o contratación de servicios de Telefónica del Perú S.A.A</b></p>
  <b>2.1. Precios</b><br>
  <ul>
    <li>
      Precios o 	Los precios corresponden a los productos/servicios descritos. Telefónica del Perú 
      S.A.A se reserva el derecho de efectuar, en cualquier momento y sin previo aviso, las modificaciones 
      que considere oportunas, pudiendo actualizar, incluso diariamente los precios de los productos y/o 
      servicios en función de las novedades del sector al que pertenecen.
    </li>
    <li>
      Telefónica del Perú S.A.A se reserva el derecho de comercializar ofertas exclusivas para 
      los Clientes que adquieran los productos/servicios a través del Canal Online de Telefónica del Perú S.A.A. 
    </li>
    <li>
      Telefónica del Perú S.A.A mostrará una confirmación del pedido seleccionado con el precio 
      regular y el precio de la promoción en los casos que aplique. 
    </li>
  </ul><b>2.2. Forma de pago</b><br><br><b>
  
  a) Para productos Móviles:</b>
  <ul>
    <li>
      El pago por la compra de productos móviles podrá ser: 
          <ul>
      <li>
        Tarjetas de crédito o débito emitidas en el país o internacionales. 
      </li>
      <li>
        Diferido (financiado a un máximo de 6 cuotas) como aviso de pago al recibo cíclico. 
      </li>
    </ul>
    </li>
    

    <li>
      No se aceptan como formas de pago los cheques ni el pago en efectivo. 
    </li>
    <li>
      El cliente recibirá un correo electrónico por parte de 
      Telefónica del Perú S.A.A de recepción del pedido. 
    </li>
    <li>
      Se entregará la guía de remisión, el comprobante de pago lo obtendrá en la web de Factura 
      Electrónica. Este documento es indispensable para hacer efectiva la garantía del equipo. 
    </li>
  </ul><b>b) Para servicios Móviles: </b>
  <ul>
    <li>
    	El pago por la contratación de servicios móviles será a través de la facturación en el 
      recibo, salvo alguna especificación expresa de pago adelantado por correo electrónico o 
      telefónicamente por alguno de los asesores de Telefónica del Perú S.A.A. 
    </li>
    <li>
      El Cliente que contrate un servicio móvil recibirá un correo electrónico por parte de 
      Telefónica del Perú S.A.A de recepción del pedido. 
    </li>
  </ul><b>2.3. Entrega</b><label><br><br>
    La entrega se realizará en la dirección indicada por el cliente al realizar la compra en el Canal 
    Online de Telefónica del Perú S.A.A. Las zonas de delivery en Lima Metropolitana son las detalladas por 
    Telefónica en el Canal Online. . 
    Los plazos máximos para la entrega del producto,
    una vez confirmado el pedido con el cliente son:</label><br><b>a) Productos Móviles:</b><label> Lima
    Metropolitana (de acuerdo a la cobertura de reparto): 48 horas (días hábiles)Otros destinos: 4 días
    hábiles</label><b><br>b) Servicios Móviles:</b><label>Lima Metropolitana y otros destinos: 7 días hábiles el
    cual está sujeto a cobertura. Nota: No se consideran días hábiles, los domingos ni feriados o no
    laborables de cualquier tipo.</label>
  <ul>
    <li>
      Telefónica del Perú S.A.A no se responsabilizará por la demora o atrasos en las entregas 
      cuando se deban a causas no imputables. 
    </li>
    <li>
      La transacción que el cliente realice por este medio es personal e intransferible y está sujeta a 
      las condiciones aquí descritas y en el documento de entrega que recibirá el cliente. 
    </li>
    <li>
      Al momento de la entrega el cliente deberá identificarse con su 
      DNI/Carné de extranjería o Fotocheck de la empresa con el Courier. 
    </li>
    <li>
      El cliente deberá especificar el nombre del contacto y registrados con su DNI/Carné de 
      extranjería para la coordinación y/o entrega de los productos o servicios solicitados. 
    </li>
    <li>
      El cliente no deberá realizar ningún pago adicional por la entrega del 
      producto adicional al de su comprobante de pago. 
    </li>
  </ul><b>2.4. Cancelaciones o devoluciones</b><label><br><br>El cliente podrá devolver su pedido en cualquiera de
    los siguientes casos:</label>
  <ul>
    <li>
      Alteración comprobada del sello de seguridad. El cliente deberá anotar una observación 
      en el registro de entrega del Courier, señalando que el sello se encontraba alterado 
      y definiendo el tipo de alteración (inexistente, roto, etc.). 
    </li>
    <li>
      Defecto del producto (daño cosmético externo, falta de funcionamiento y operación o desperfecto). 
    </li>
    <li>
      La devolución de equipos (móviles), cualquiera sea su causa, deberá remitirse en 
      su embalaje original y con todos los accesorios y manuales incluidos. 
    </li>
  </ul><b>2.5. Garantía</b><br><label><br>Todos los equipos (móviles) entregados por Telefónica del Perú S.A.A, se
    encuentran amparados bajo las políticas de garantía que se detallan a continuación:</label>
  <ul>
    <li>
      Garantía limitada de 1 año, contada a partir de la fecha que consta en la factura. 
      La garantía es solo para el comprador original y en condiciones normales de uso. 
    </li>
    <li>
      La garantía cubre defectos de componentes del equipo y mano de obra. 
    </li>
    <li>
      La garantía no cubre fallas o mal funcionamiento por: golpes, humedad, maltrato, 
      mal uso, rotura o adulteración de sellos de garantía, alteración o imposibilidad de lectura 
      de números de serie, en caso de que aplique. 
    </li>
    <li>
      La garantía se hará efectiva en cualquier servicio técnico autorizado de Telefónica del Perú S.A.A 
      ubicados únicamente en centros de atención, ventas y servicios de Telefónica del Perú. 
    </li>
    <li>
      La evaluación de mal funcionamiento o defectos de equipo dará lugar a la 
      garantía únicamente si es determinada por el personal de cualquier servicio técnico 
      autorizado de Telefónica del Perú S.A.A. 
    </li>
    <li>
      Durante el periodo de garantía, Telefónica del Perú S.A.A., puede a su criterio reparar el equipo o 
      reemplazarlo por un equipo equivalente, sin costo para el comprador original. 
    </li>
  </ul>
  <label>
    Para ser sujeto de la garantía es necesario la presentación de la boleta / 
    factura original o electrónica y Guía de la compra, la cual deberá incluir el número de 
    serie del equipo, en caso aplique.
  </label>
    
    <p><b>3.- Configuración de Servicios de Telefónica del Perú S.A.A.</b></p>
    <label>
      El contacto Administrador Canal On line podrá realizar modificaciones 
      a los servicios contratos, tales como: 
    </label>
  <ul class="bullet">
    <li>Cambio en la Configuración de facturación:
      <ul class="bullet">
        <li>Dirección de Facturación</li>
        <li>Método de Entrega</li>
        <li>Notificaciones de Facturación</li>
      </ul>
    </li>
    <li>Notificaciones de Facturación o Cambio de Límite de crédito 
      <ul class="bullet">
        <li>Distribución de Plan Compartido</li>
        <li>Por suscripción</li>
        <li>Descargar información de su Planta contratada</li>
      </ul>
    </li>
  </ul>
  <p><b>IV.	Prohibiciones</b></p>
  <ul>
    <li>
      Está prohibido utilizar el Canal Online de Telefónica del Perú S.A.A para: <br>
      (i) Conectarla o de cualquier forma vincularla a programas informáticos que constituyan, 
          promuevan o den acceso a actividades de espionaje, piratería o cualquier otro programa o 
          código que de cualquier manera atente contra la integridad de los servicios y sistemas de 
          Movistar y su seguridad informática.
      (ii) Fines ilegales, fraudulentos o de cualquier modo vinculados a actos delictivos.
      (iii) Enviar spam o mensajes no solicitados, enviar, recibir, subir, bajar o usar cualquier 
        tipo de material o contenido ilegal, ofensivo, abusivo, malicioso, amenazante, indecente, 
        difamatorio, obsceno, racista, o que resulte de cualquier manera discriminatorio u objetable.
      (iv) Acosar, perseguir, hostigar, atormentar o de cualquier modo molestar a una persona, 
          calumniar, injuriar, suplantar o hacerse pasar por otra persona.
      (v) De cualquier manera, ser utilizada como herramienta de control empresarial o parental, 
          así como para espiar y/o vulnerar el secreto a las comunicaciones de terceros.
      (vi) De cualquier manera, infringir derechos de autor, marcario, de confidencialidad, privacidad o 
          propiedad intelectual de Movistar o de terceros para realizar o alentar el envío de publicidad, 
          promociones, mensajes o comunicaciones masivas no deseadas.
    </li>
    <li>
      El uso del Canal Online de Telefónica del Perú S.A.A para cualquiera de los fines detallados 
      precedentemente y, en general, para un fin distinto de aquel para el cual ha sido habilitada, 
      y/o contrario a estos T&C, implicará el bloqueo, temporal o permanente, o la baja del Canal Online 
      de Telefónica del Perú S.A.A, según sea el caso, y/o la terminación del servicio asociado a la misma. 
      Ello así, sin perjuicio de cualquier acción o reclamo que pudiera corresponder a Movistar por el uso 
      indebido de Canal Online de Telefónica del Perú S.A.A o los servicios que presta. Asimismo, Canal 
      Online de Telefónica del Perú S.A.A podrá ser suspendida, limitada y/o cancelada en forma independiente 
      de los servicios que posea contratados con Movistar.
    </li>  
    <li>
      Específicamente, Movistar podrá limitar el uso o bloquear por completo Canal On line de Telefónica 
      del Perú S.A.A en caso de que lo uses de una manera indebida, abusiva o contraria al buen uso de 
      los servicios de Movistar, incluyendo los casos en que dicho uso pudiere representar una amenaza para 
      la seguridad o integridad de la red de comunicaciones o que, de cualquier otro modo, pudiere afectar 
      el normal funcionamiento de tal red o derechos de terceros. Ello, a sólo criterio de Movistar y sin 
      necesidad de preaviso.
    </li>  
  </ul>
  <p><b>V.	Protección de Datos Personales</b></p>
  <ul>
    <li>
      Aceptas que tu información y datos personales sean tratados de acuerdo con lo estipulado en los 
      presentes T&C en la Política de Privacidad Global de Telefónica. 
      (http://www.movistar.com.pe/privacidad-y-proteccion-datos).
      <br><br>
      Asimismo, autorizas expresamente a que Movistar pueda hacer uso y tratar los siguientes datos
      personales: i) aquellos que proporciones en las contrataciones de los servicios, 
      ii) aquella que resulte de la navegación o uso que realice en cualquier sitio web o aplicativo de Movistar, 
      iii) tus datos de tráfico necesarios para mostrar los consumos; iv) los datos obtenidos a 
      través de tu dispositivo tu agenda de contactos, sistema operativo, versión de Canal Online de 
      Telefónica del Perú S.A.A que utilices, red desde la que te conectas, etc., 
      v) ubicación del teléfono móvil, así como toda aquella información adicional que se derive por el uso 
      del aplicativo; todo lo anterior denominado en adelante como, la “Información Confidencial”.
      <br><br>
    </li>
    <li>
      En Movistar trataremos sus datos personales para: (i) creación de perfiles para el envío de ofertas
      personalizadas y la adecuación de estas a sus características particulares, ii) la mejora continua
      de los servicios, contenido y experiencias de Movistar, iii) realizar encuestas y estudios para conocer 
      los niveles de satisfacción, conocer preferencias y sugerencias, probar funciones en fase de desarrollo
      <br><br>
      Los datos personales recabados serán incluidos en el Banco de Datos Personales de Clientes, de titularidad de Movistar.
      <br><br>
    </li>
    <li>
      Con carácter general, todos aquellos datos que sean necesarios para la ejecución de Canal Online 
      de Telefónica del Perú S.A.A se recogerán y tratarán solo mientras seas Usuario de Canal Online 
      de Telefónica del Perú S.A.A, o hasta que ejerzas tu derecho de cancelación u oposición.
    </li>
    <li>
      Movistar comparte tus datos personales recabados con Telefónica Digital España, 
      con CIF B81388953, domiciliada en Calle Gran Vía 28, 28013, Madrid, España, en su calidad de encargado 
      del tratamiento, con las finalidades descritas en el punto 9.2 así como para facilitar la operación 
      técnica de la aplicación y sus funcionalidades.
    </li>
    <li>
      Canal Online de Telefónica del Perú S.A.A utiliza cookies para recabar información sobre 
      las interacciones del Usuario y la forma en que utilizan Canal Online de Telefónica del Perú 
      S.A.A. Al descargar y/o utilizar Canal Online de Telefónica del Perú S.A.A entendemos que consientes 
      que Movistar utilice cookies para dichas finalidades. 
    </li>
    <li>
      Finalmente, declaras conocer que puedes ejercer, conforme a la normativa vigente, los derechos 
      de información, acceso, actualización, inclusión, rectificación, supresión y oposición sobre 
      sus datos personales recabados en este aplicativo, en cualquier Centro de Atención al Cliente de 
      Movistar o al enviar un correo electrónico a protecciondedatos@movistar.com.pe.
    </li>
  </ul> 
  <p><b>VI.	Seguridad del Canal Online de Telefónica del Perú S.A.A</b></p>
  <ul>
    <li>
      Movistar tiene implantadas robustas medidas para garantizar la seguridad, confidencialidad y 
      privacidad de tu información. Del mismo modo, podremos establecer políticas de uso razonable de 
      nuestros servicios con la finalidad de prevenir posibles fraudes, usos ilícitos y/o abusivos. 
      Se entiende por uso excesivo o no razonable aquél que se encuentre de forma significativa por 
      encima del uso medio que realiza el Usuario. En estos casos, Movistar podrá avisarte, reservándose 
      además el derecho a suspender el servicio o bien, en los casos más graves, dar de baja al Usuario.
    </li>
    <li>
      Igualmente, Movistar podrá poner en conocimiento de las autoridades competentes, o bien colaborar 
      con éstas, ante cualquier posible infracción de la legislación vigente que se detecte en el Canal 
      Online de Telefónica del Perú S.A.A, especialmente en caso de que tal infracción pudiera suponer 
      la comisión de delito.
    </li>
  </ul>
  <p><b>VII.	Propiedad intelectual e industrial</b></p>
  <ul>
    <li>
      Movistar cuenta con todos los derechos y autorizaciones necesarias sobre el Canal Online de 
      Telefónica del Perú S.A.A, incluyendo tanto sus marcas como la App móvil. En este sentido, se 
      te otorga únicamente una licencia limitada, intransferible, no apta para ser sublicenciable, 
      temporal, no exclusiva, revocable y, en tanto no se te comunique lo contrario, gratuita, para 
      que puedas utilizar, descargar y/o instalar el Canal Online de Telefónica del Perú S.A.A en tus 
      dispositivos, conforme a lo previsto en estos T&C y para los usos previstos. No tendrás derecho 
      a sublicenciar, vender, ceder, alquilar, distribuir, transferir o, de cualquier otra manera, 
      otorgar a terceros derechos sobre el Canal Online de Telefónica del Perú S.A.A. Asimismo, no 
      deberás realizar ninguna acción para poner en peligro, limitar o, de forma alguna, interferir 
      con los derechos de propiedad intelectual del Canal Online de Telefónica del Perú S.A.A, la cual
       usará con sujeción a estos T&C. En todo caso, Movistar se reserva los derechos no expresamente 
       otorgados al Usuario en virtud de los presentes T&C.
    </li>
    <li>
      Si bien conservará todos los derechos sobre los contenidos que generes o envíes a través del Canal 
      Online de Telefónica del Perú S.A.A, otorgas a Movistar una licencia no exclusiva, de ámbito mundial 
      y limitada al tiempo que tengas activa tu cuenta y/o bien cuando decidas eliminarlos, para reproducir 
      los mismos y adaptarlos a las necesidades técnicas del Canal Online de Telefónica del 
      Perú S.A.A y/o de Movistar.
    </li>
  </ul>
  <p><b>VIII.	Responsabilidad y obligaciones</b></p>
  <ul>
    <li>
      Movistar no garantiza el uso, o uso permanente, del Canal Online de Telefónica del Perú S.A.A a 
      los Usuarios. En concreto, los servicios del Canal Online de Telefónica del Perú S.A.A se ofrecen 
      sin garantía de ningún tipo dado que su calidad y disponibilidad pueden verse afectadas por múltiples 
      factores ajenos a Movistar como son, entre otros, la ubicación geográfica del Usuario, limitaciones 
      o restricciones de las redes o la compatibilidad del dispositivo y sistema operativo utilizado por éste. 
      Igualmente, aceptas que el servicio pueda verse interrumpido cuando sea necesario por labores de 
      mantenimiento. Movistar no garantiza, y en consecuencia no será responsable, por las imprecisiones, 
      errores, defectos, fallas, retrasos, virus o interrupciones que presente el Canal Online de Telefónica 
      del Perú S.A.A. Tampoco garantiza y, en consecuencia, no será responsable por su confiabilidad, 
      calidad, precisión, integridad o validez. El Canal Online de Telefónica del Perú S.A.A es provista 
      en las condiciones que se encuentre para su descarga o utilización, y Movistar no otorga garantía 
      de ningún tipo por la misma y expresamente deslinda cualquier responsabilidad en cuanto a la prestación, 
      utilidad, disponibilidad, almacenamiento y manejo de información, seguridad, propiedad y/o derechos 
      relacionados con el Canal Online de Telefónica del Perú S.A.A. La descarga y uso de Canal Online de 
      Telefónica del Perú S.A.A caen bajo tu exclusiva responsabilidad. En caso se verifique circunstancias 
      ajenas a la voluntad de Movistar que impliquen que el Canal Online de Telefónica del Perú S.A.A no 
      se encuentre operativa durante un determinado periodo de tiempo, Movistar procurará restablecer su 
      aplicación con la mayor celeridad posible, sin que por ello pueda imputársele algún tipo de responsabilidad.
       Movistar no garantiza la disponibilidad, condición de calidad óptima, comercialización, idoneidad para 
       determinado fin y continuidad del funcionamiento de la Aplicación y sobre su contenido.
    </li>
    <li>
      Movistar no será responsable por los daños y perjuicios, lucro cesante o cualquier otro daño emergente 
      por el uso del Canal Online de Telefónica del Perú S.A.A. A todo evento y en tanto puede bloquear 
      el acceso a Canal Online de Telefónica del Perú S.A.A desde cualquier dispositivo, Movistar no se 
      responsabiliza por los cargos incurridos como consecuencia del uso en dispositivos perdidos, 
      hurtados o robados. 12.3. En cualquier caso, Movistar se reserva el derecho a interrumpir, 
      suspender y/o modificar, en cualquier momento, cualquiera o todos los servicios de Canal Online 
      de Telefónica del Perú S.A.A, ya sea de forma permanente o transitoria. No se requerirá conformidad 
      de los Usuarios, ni será necesario aviso previo alguno.
    </li>
    <li>
      Por todo ello, Movistar no será responsable de los problemas de acceso o disponibilidad de Canal 
      Online de Telefónica del Perú S.A.A y/o sus servicios, ni de los perjuicios que se pudieran causar 
      por ello, cuando éstos procedan de factores ajenos a su ámbito de control. Igualmente, Movistar no 
      se hace responsable de los fallos, incompatibilidades y/o daños de tus terminales o dispositivos 
      que, en su caso, se pudiesen derivar de la descarga y/o uso de Canal Online de Telefónica del Perú S.A.A, 
      especialmente cuando éstos no sean compatibles o adecuados para utilizar nuestros servicios. Concretamente, 
      Movistar no se responsabilizará por la pérdida o daño de la agenda de contactos o la pérdida del historial 
      que puedan ocurrir al usar Canal Online de Telefónica del Perú S.A.A.
    </li>
    <li>
      Queda prohibido cualquier acceso y/o uso de Canal Online de Telefónica del Perú S.A.A contrario a estos 
      T&C, a las condiciones específicas de cada servicio y, en general, a la legalidad vigente, los principios 
      de buena fe, la moral y el orden público. El Usuario es el responsable del uso que decida hacer de Canal 
      Online de Telefónica del Perú S.A.A y deberá garantizar que su utilización no vulnera derechos de terceros. 
      Movistar podrá suspender o interrumpirle Canal Online de Telefónica del Perú S.A.A en caso de que sospeche 
      que el Usuario viola estos T&C, los de los servicios provistos por Movistar, o la utiliza de forma ilegal, 
      no autorizada o inadecuada.
    </li>
    <li>
      Los servicios de Canal Online de Telefónica del Perú S.A.A se ofrecen exclusivamente para su uso personal 
      y privado como Usuario, por tanto, no debes revenderlos ni utilizarlos para una finalidad económica, 
      comercial o similar, sin la autorización de Movistar. El incumplimiento de tus obligaciones como Usuario 
      podrá implicar la baja inmediata de Canal Online de Telefónica del Perú S.A.A y/o sus servicios todo ello 
      sin derecho a recibir compensación y/o reembolso de ningún tipo.
    </li>
    <li>
      Los T&C aplicables al servicio WiFi y/o de acceso a internet de terceros operadores, con el cual podrías 
      utilizar Canal Online de Telefónica del Perú S.A.A, son ajenos a Movistar y serán aquellos que contrates 
      con el proveedor correspondiente. Por lo tanto, Movistar no tendrá responsabilidad alguna al efecto.
    </li>
    <li>
      En caso de que la información o los datos suministrados por el Usuario no sean verdaderos, 
      éste será responsable por los daños que este hecho pudiera ocasionar.
    </li>
    <li>
      Acepta que cualquier limitación de responsabilidad incluida en estos T&C respecto de Movistar, 
      alcanza a también a todas y cada una de las empresas pertenecientes al Grupo Telefónica, con los 
      mismos alcances de estos T&C.
    </li>
  </ul>
  <p><b>IX.	Miscelánea</b></p>
  <ul>
    <li>
      Canal On line de Telefónica del Perú S.A.A está pensada para ser utilizada por cualquier Usuario que 
      cumpla los presentes T&C. Asimismo, es posible que Canal Online de Telefónica del Perú S.A.A tenga 
      restricciones, no funcione o bien sus servicios no estén disponibles en todo momento. Como regla general, 
      y en tanto Canal Online de Telefónica del Perú S.A.A está directamente conectada con la/s línea/s móvil/es 
      o fija/s del Usuario vinculada/s, la suspensión o baja de las líneas o los servicios provistos por Movistar, 
      o el incumplimiento de sus T&C por cualquier motivo, implicará la suspensión o baja de Canal Online de 
      Telefónica del Perú S.A.A, o cualquiera de sus servicios, según corresponda.
    </li>
    <li>
      Movistar se reserva el derecho de revisar estos T&C en cualquier momento por razones legales, 
      técnicas, comerciales o por decisiones estratégicas. En ese caso, te avisaremos de ello 
      publicándolo en Canal Online de Telefónica del Perú S.A.A y, si continúas utilizándolo y no solicitas 
      tu baja como Usuario, entenderemos que aceptas las modificaciones.
    </li>
    <li>
      Todas las sugerencias y comentarios que realices podrán ser tenidos en cuenta, implementados y/o 
      adaptados por Movistar sin que ello genere derecho alguno a favor del Usuario.
    </li>
    <li>
      Si bien estos T&C podrán estar disponibles en varios idiomas, prevalecerá la versión en español 
      en el supuesto de contradicciones. Además, algunas partes de Canal Online de Telefónica del Perú 
      S.A.A, y/o determinados servicios disponibles a través de esta, estarán disponibles únicamente en idioma español.
    </li>
    <li>
      Entiendes y aceptas que se aplicarán a estos T&C, y a Canal Online de Telefónica del Perú S.A.A, 
      la normativa vigente en la República del Perú. Cualquier cuestión surgida de estos T&C, y/o Canal 
      Online de Telefónica del Perú S.A.A, será sometida a la jurisdicción de los Tribunales Ordinarios 
      correspondientes a tu domicilio o de los Tribunales competentes debido a la materia, en cuyo caso 
      la competencia territorial será la del fuero correspondiente a tu domicilio. Para el eventual caso 
      de reclamo, se considerará domicilio legalmente constituido el que figure en la Factura y serán de 
      aplicación también las demás cláusulas de los T&C del servicio aplicable.
    </li>
    <li>
      El incumplimiento de cualquiera de las obligaciones asumidas, o cualquiera de las condiciones 
      convenidas en la presente, ocasionará automáticamente la caducidad del servicio y, en su caso, 
      de Canal Online de Telefónica del Perú S.A.A. Movistar está facultada para modificar el sistema o 
      Canal Online de Telefónica del Perú S.A.A, así como a interrumpir su prestación, sin previo aviso.
    </li>
    <li>
      Canal Online de Telefónica del Perú S.A.A requiere que el cliente mantenga activo el servicio de 
      geolocalización de su teléfono móvil para proveerle los servicios que presta a través de Canal 
      Online de Telefónica del Perú S.A.A de una manera más eficiente.
    </li>
  </ul>
  <p><b>X. Información corporativa y contacto</b></p>
  <ul>
    <li>
      Todas las notificaciones y/o comunicaciones que deban efectuarse bajo estos T&C, podrán realizarse: 
      (i) al Usuario: por cualquier medio, incluyendo, correo electrónico, línea móvil, línea fija, cuenta 
      de correo electrónica o postal consignada por éste, a través de Canal Online de Telefónica del Perú 
      S.A.A, por carta al domicilio del Usuario, por SMS al número de la/s línea/s móvil/es vinculad/as u 
      otros medios de comunicación que existan entre Movistar y el Usuario; (ii) a Movistar: a su domicilio 
      legal en Av. Alfredo Benavides N° 661, Miraflores, Lima.
    </li>
  </ul>
  <p><b>XI. Resolución de disputas</b></p>
  <ul>
    <li>
      Cualquier disputa o reclamo que surja de o con relación a, o en conexión con la ejecución o 
      cumplimiento de estos T&C o de la utilización de Canal Online de Telefónica del Perú S.A.A, 
      incluyendo sin limitación cualquier disputa sobre la validez, interpretación, exigibilidad o 
      incumplimiento de ellas, será exclusiva y finalmente resuelta aplicando la ley, en idioma español 
      y sometiéndolas a las autoridades jurisdiccionales competentes con domicilio en el territorio peruano.
    </li>
  </ul>
</div>
`;

const licencias = `
<p style="text-align: justify;
margin-bottom: 19px; font-size: 14px;">Una licencia de código abierto es un conjunto de términos y condiciones legales que permiten a los usuarios utilizar, modificar y distribuir el código fuente de un software de manera libre y abierta.</p>
<p style="text-align: justify; margin-bottom: 19px; font-size: 14px; margin-top: 8px;">Esta aplicación contiene algunos componentes de código abierto entre los que se encuentran:</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b> JAVA JDK - Binary Code License (“BCL”) </b> https://www.oracle.com/downloads/licenses/binary-code-license.html</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b> GRADLE - Apache License 2.0. </b> https://github.com/gradle/gradle/blob/master/LICENSE</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b> NODE - Copyright Joyent, Inc. </b>  https://github.com/nodejs/node/blob/main/LICENSE</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b>ANDROID STUDIO - Android Software Development Kit License Agreement </b>  https://developer.android.com/studio/terms</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b> XCODE </b> https://www.apple.com/legal/sla/docs/xcode.pdf</p>
<br>
<p style="text-align: inherit;
margin-bottom: 19px; font-size: 14px;"> <b> IONIC - MIT license. / Apache 2 license.</b> https://www.apache.org/licenses/LICENSE-2.0 https://opensource.org/license/mit/</p>
`;
