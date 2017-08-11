package com.curriculum.domain.constants;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QConstants is a Querydsl query type for Constants
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QConstants extends EntityPathBase<Constants> {

    private static final long serialVersionUID = -1507138036L;

    public static final QConstants constants = new QConstants("constants");

    public final ListPath<String, StringPath> faculty = this.<String, StringPath>createList("faculty", String.class, StringPath.class, PathInits.DIRECT2);

    public final StringPath id = createString("id");

    public final ListPath<String, StringPath> knowledgeBranch = this.<String, StringPath>createList("knowledgeBranch", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<String, StringPath> qualificationLevel = this.<String, StringPath>createList("qualificationLevel", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<String, StringPath> specialty = this.<String, StringPath>createList("specialty", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<String, StringPath> studyForm = this.<String, StringPath>createList("studyForm", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<String, StringPath> trainingDirection = this.<String, StringPath>createList("trainingDirection", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<String, StringPath> type = this.<String, StringPath>createList("type", String.class, StringPath.class, PathInits.DIRECT2);

    public QConstants(String variable) {
        super(Constants.class, forVariable(variable));
    }

    public QConstants(Path<? extends Constants> path) {
        super(path.getType(), path.getMetadata());
    }

    public QConstants(PathMetadata<?> metadata) {
        super(Constants.class, metadata);
    }

}

