# Proyecto ALQUIPC - Sistema de Facturación

Este proyecto es un sistema de facturación para la empresa **ALQUIPC**, especializada en alquiler de equipos de cómputo portátiles.


## 📋 Reglas de negocio
- Cada equipo cuesta **$35.000 por día**.
- Se requiere un mínimo de 2 equipos por alquiler.
- Opciones de alquiler:
  - Dentro de la ciudad → precio normal.
  - Fuera de la ciudad → +5% (cargo por servicio a domicilio).
  - Dentro del local → -5% (descuento por uso en instalaciones).
- Sistema de descuento para días adicionales:
  - 1-3 días adicionales → 2% de descuento
  - 4-7 días adicionales → 3% de descuento
  - 8-15 días adicionales → 4% de descuento
  - Más de 15 días adicionales → 5% de descuento (máximo)

## ✨ Características
- **Hero Section** con mensaje de bienvenida y botón de navegación
- **Generación automática de ID de cliente** con formato personalizado
- **Validación de datos** para garantizar información correcta

## 🚀 Cómo usarlo
1. Abrir `index.html` en el navegador.
2. Navegar a la sección de facturación usando el botón en la hero section.
3. Se generará automáticamente un ID de cliente único.
4. Introducir el email del cliente para el envío de la factura.
5. Llenar el formulario con los datos del alquiler:
   - Número de equipos (mínimo 2)
   - Días iniciales de alquiler
   - Días adicionales (si aplica)
   - Opción de alquiler
6. Presionar **Calcular Factura** para ver los detalles.
7. Presionar **Enviar Factura por Email** para simular el envío.

## 🎨 Tecnologías usadas
- **HTML5** → estructura semántica y accesible
- **CSS3** → diseño responsive con variables de color y efectos visuales
- **JavaScript** → lógica de negocio y mejora de experiencia de usuario


## 📏 Norma de calidad McCall aplicada
- **Corrección**: Validación completa de datos de entrada (equipos, email)
- **Fiabilidad**: Sistema de cálculo robusto con reglas de negocio claras
- **Eficiencia**: Código optimizado con funciones reutilizables


