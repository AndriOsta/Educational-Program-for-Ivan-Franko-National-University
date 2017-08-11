package com.curriculum.domain.cirriculum;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QCurriculum is a Querydsl query type for Curriculum
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QCurriculum extends EntityPathBase<Curriculum> {

    private static final long serialVersionUID = 1423455030L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCurriculum curriculum = new QCurriculum("curriculum");

    public final StringPath createdBy = createString("createdBy");

    public final DateTimePath<java.util.Date> createdDate = createDateTime("createdDate", java.util.Date.class);

    public final StringPath faculty = createString("faculty");

    public final StringPath id = createString("id");

    public final com.curriculum.domain.cirriculum.individual.QIndividualWork individualWork;

    public final StringPath knowledgeBranch = createString("knowledgeBranch");

    public final ListPath<Module, QModule> modules = this.<Module, QModule>createList("modules", Module.class, QModule.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath qualificationLevel = createString("qualificationLevel");

    public final StringPath specialty = createString("specialty");

    public final StringPath studyForm = createString("studyForm");

    public final NumberPath<Integer> term = createNumber("term", Integer.class);

    public final ListPath<Textbook, QTextbook> textbooks = this.<Textbook, QTextbook>createList("textbooks", Textbook.class, QTextbook.class, PathInits.DIRECT2);

    public final StringPath trainingDirection = createString("trainingDirection");

    public final StringPath type = createString("type");

    public QCurriculum(String variable) {
        this(Curriculum.class, forVariable(variable), INITS);
    }

    public QCurriculum(Path<? extends Curriculum> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QCurriculum(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QCurriculum(PathMetadata<?> metadata, PathInits inits) {
        this(Curriculum.class, metadata, inits);
    }

    public QCurriculum(Class<? extends Curriculum> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.individualWork = inits.isInitialized("individualWork") ? new com.curriculum.domain.cirriculum.individual.QIndividualWork(forProperty("individualWork")) : null;
    }

}

