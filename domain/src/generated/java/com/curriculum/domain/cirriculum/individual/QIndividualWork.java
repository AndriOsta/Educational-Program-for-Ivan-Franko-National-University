package com.curriculum.domain.cirriculum.individual;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QIndividualWork is a Querydsl query type for IndividualWork
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QIndividualWork extends BeanPath<IndividualWork> {

    private static final long serialVersionUID = 222648612L;

    public static final QIndividualWork individualWork = new QIndividualWork("individualWork");

    public final SimplePath<IndividualElement> colloquium = createSimple("colloquium", IndividualElement.class);

    public final SimplePath<IndividualElement> laboratory = createSimple("laboratory", IndividualElement.class);

    public QIndividualWork(String variable) {
        super(IndividualWork.class, forVariable(variable));
    }

    public QIndividualWork(Path<? extends IndividualWork> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIndividualWork(PathMetadata<?> metadata) {
        super(IndividualWork.class, metadata);
    }

}

