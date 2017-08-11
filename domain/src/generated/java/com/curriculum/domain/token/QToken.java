package com.curriculum.domain.token;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QToken is a Querydsl query type for Token
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QToken extends EntityPathBase<Token> {

    private static final long serialVersionUID = -1913244576L;

    public static final QToken token = new QToken("token");

    public final DateTimePath<java.util.Date> creationDate = createDateTime("creationDate", java.util.Date.class);

    public final StringPath id = createString("id");

    public final StringPath userId = createString("userId");

    public final StringPath userRole = createString("userRole");

    public QToken(String variable) {
        super(Token.class, forVariable(variable));
    }

    public QToken(Path<? extends Token> path) {
        super(path.getType(), path.getMetadata());
    }

    public QToken(PathMetadata<?> metadata) {
        super(Token.class, metadata);
    }

}

