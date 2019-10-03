import React from 'react';
import { Container } from '../../components/container';
import { TermsSection } from './components/terms-section';
import { TermsScrollView, TermsTitle } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';

const Terms = () => (
  <Container>
    <TermsScrollView>
      <TermsTitle>Introducción a los términos y condiciones</TermsTitle>
      <TermsSection>
          Estos términos y condiciones (que pueden ser modificados) son
          aplicables a todos los servicios directos o indirectos (a través de
          los transportistas) disponibles online, a través de cualquier
          dispositivo móvil. Al acceder, navegar y usar nuestra aplicación y/o
          aceptar una oferta, aceptás haber leído, entendido y estar de acuerdo
          con los términos y condiciones que se muestran a continuación
          (incluyendo el fragmento referente a la privacidad).
        {'\n'}
        {'\n'}
          Esta aplicación, su contenido, infraestructura y el servicio que
          ofrece pertenecen y son gestionadas y suministradas por FLETNET. Solo
          pueden ser utilizadas por los usuarios conforme a los términos y
          condiciones especificados a continuación. La relación que tenemos con
          los transportistas está regulada por otros términos y condiciones
          distintos.
        {' '}
      </TermsSection>
      <TermsSection title="1. Ámbito y naturaleza de nuestro servicio">
      A través de la Aplicación, nosotros (FLETNET) proporcionamos una
          plataforma en línea a través de la cual los usuarios solicitan los
          servicios de un transportista para el transporte de mercadería
          determinada y detallada, desde un punto del país a otro, en un momento
          determinado, con el fin de que los transportistas realicen una
          cotización del transporte solicitado ofreciendo sus servicios. Al
          elegir y/o seleccionar un transportista determinado establecés una
          relación contractual directa (legalmente vinculante) con el
          Transportista al que hubieres elegido para el transporte. Desde el
          momento en que realizás la elección del transportista, FLETNET actúa
          únicamente como intermediarios entre vos y el transportista,
          trasmitiendote los datos necesarios del transportista que corresponda.
          FLETNET no revende, alquila ni ofrece ningún servicio de transporte.
        {'\n'}
        {'\n'}
          La información que brindamos es la información que nos proporcionan
          los transportistas. Los transportistas se hacen totalmente
          responsables de actualizar los datos que aparecen en nuestra
          plataforma. FLETNET no responde por los datos brindados por los
          transportistas. Aunque intentamos que nuestro servicio sea lo más
          preciso posible, no podemos verificar ni garantizar que toda la
          información sea exacta, completa o correcta. Tampoco nos hacemos
          responsables de errores (como errores manifiestos y tipográficos),
          interrupciones (debido a caídas temporales y/o parciales del servidor
          o a reparaciones, actualizaciones y mantenimiento de nuestra
          Plataforma u otros motivos), información imprecisa, engañosa o falsa,
          o falta de información. El Transportista es responsable en todo
          momento de la precisión, la exactitud y la corrección de la
          información (tanto descriptiva como referente a tarifas, cargos,
          precios, políticas, condiciones y disponibilidad) que brinde en
          nuestra plataforma. Nuestra Plataforma no constituye ni debe ser vista
          como una recomendación o promoción de la calidad, el nivel de servicio
          de cualquier Transportista disponible (ni de sus elementos de
          trabajos, empleados, etc.).
        {'\n'}
        {'\n'}
          El Usuario es plenamente responsable de las publicaciones que ingresa
          a la plataforma y de los datos que aporta, tanto respecto de la
          mercadería a Transportar como los datos de puntos de partida y entrega
          de dicha mercadería. Queda totalmente prohibido el transporte de
          sustancias tóxicas y/o prohibidas, pudiendo en su caso FLETNET
          eliminar las publicaciones que contengan dichas sustancias.
      </TermsSection>
    </TermsScrollView>
  </Container>
);

export default Terms;
