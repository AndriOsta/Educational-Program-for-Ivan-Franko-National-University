package com.curriculum.domain.cirriculum;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QTextbook is a Querydsl query type for Textbook
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QTextbook extends BeanPath<Textbook> {

    private static final long serialVersionUID = -249873583L;

    public static final QTextbook textbook = new QTextbook("textbook");

    public final NumberPath<Integer> code = createNumber("code", Integer.class);

    public final StringPath value = createString("value");

    public QTextbook(String variable) {
        super(Textbook.class, forVariable(variable));
    }

    public QTextbook(Path<? extends Textbook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTextbook(PathMetadata<?> metadata) {
        super(Textbook.class, metadata);
    }

}

