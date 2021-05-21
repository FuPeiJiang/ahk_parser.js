v:=255*(A_IsUnicode ? 2:1)
v:=A_IsUnicode ? 2:1 + var + "fe" + {} + []
foo( bufName, 255*( A_IsUnicode ? 2 : 1 ), 0 )
foo( bufName, 255*( A_IsUnicode ? 2 : (1) ), 0 )
foo( bufName, A_IsUnicode ? 510 : 255 , 0 )
foo( bufName,  A_IsUnicode        ?       510           :        255   )
if (A_IsUnicode) {
  v:=510
} else {
  v:=255
}