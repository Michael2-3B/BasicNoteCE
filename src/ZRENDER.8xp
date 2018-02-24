//Currently a separate program, will be integrated later.

ClrDraw
Horizontal ~15,Black,1
TextColor(Navy
Text(0,88,"BasicNote CE
TextColor(Black
Horizontal ~150,Black,1
Text(0,254,"A
15->B:2->C
For(I,Z,dim(|LCNOTE
	If I>1
	2+int(|LCNOTE(I-1->C
	If C<=length(Str7) and fPart(|LCNOTE(I:Then
		If "[xbar]"=sub(Str7,C,1
		C+1->C
		Text(B,1,sub(Str7,C,int(|LCNOTE(I)-(C-1)(I>1
	End
	B+12->B
End
