Fotos de padrinos (sin base de datos)
=====================================

Coloca un archivo jpg por cada padrino, usando el **mismo número que el id**
del registro en la tabla `sponsor` (el que devuelve la API).

Ruta en disco (este proyecto):
  xv_hanna/public/padrinos/<id>.jpg

URL en el navegador:
  /padrinos/<id>.jpg

Ejemplo: si un padrino tiene id 3 en la base de datos, el archivo debe ser:
  public/padrinos/3.jpg

Si el archivo no existe o falla la carga, la invitación muestra el recuadro
con el texto "Imagen alusiva".
