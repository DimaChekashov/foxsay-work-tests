package banan.error;

import haxe.macro.Context;
import haxe.macro.Expr;

class ErrorTypeMacro {
    
    public static function build(): Array<Field> {
        
        var catRange: Int = 100;

        var fields = Context.getBuildFields();
        
        var messageByCode: Array<Expr> = [];
        var messageByCodeField: Field;
        
        var catByCode: Array<Expr> = [];
        var catByCodeField: Field;
        
        for (field in fields) {
            
            var errorMeta = Lambda.find(field.meta, m->m.name == "error");
            
            if (errorMeta != null) {
                
                field.meta.remove(errorMeta);
                
                switch(field.kind) {
                    
                    case FieldType.FVar(t, null):
                        var code: Int = messageByCode.length + catRange;
                        field.kind = FieldType.FVar(t, macro $v{code});

                        messageByCode.push(errorMeta.params[0]);
                        catByCode.push(errorMeta.params[1]);
                        
                    default: 
                        Context.error('bad field kind', field.pos);
                }
            }
            
            if (field.name == "messageByCode") {
                messageByCodeField = field;
            }
            else if (field.name == "catByCode") {
                catByCodeField = field;
            }
            else if (field.name == "catRange") {

                switch (field.kind) {

                    case FieldType.FVar(t, null):
                        field.kind = FieldType.FVar(t, macro $v{catRange});
                        
                    default:
                        Context.error('bad field kind', field.pos);
                }
            }
        }
        
        setKind(messageByCodeField, messageByCode);
        setKind(catByCodeField, catByCode);
        
        return fields;
    }
    
    private static function setKind(field: Field, arr: Array<Expr>): Void {
        
        switch(field.kind) {
            
            case FieldType.FVar(t, null):
                field.kind = FieldType.FVar(t, macro $a{arr});
                
            default:
                Context.error('bad field kind', field.pos);
        }
    }
}