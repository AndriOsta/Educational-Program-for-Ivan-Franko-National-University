package com.curriculum.domain.cirriculum;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QModule is a Querydsl query type for Module
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QModule extends BeanPath<Module> {

    private static final long serialVersionUID = 1041494759L;

    public static final QModule module = new QModule("module");

    public final NumberPath<Integer> code = createNumber("code", Integer.class);

    public final StringPath description = createString("description");

    public final NumberPath<Integer> laboratories = createNumber("laboratories", Integer.class);

    public final NumberPath<Integer> lectures = createNumber("lectures", Integer.class);

    public final StringPath name = createString("name");

    public QModule(String variable) {
        super(Module.class, forVariable(variable));
    }

    public QModule(Path<? extends Module> path) {
        super(path.getType(), path.getMetadata());
    }

    public QModule(PathMetadata<?> metadata) {
        super(Module.class, metadata);
    }

}

