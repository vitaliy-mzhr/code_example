import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cn from 'classnames';
import Collapse, { Panel } from 'rc-collapse';

import Choice from '../../Choice';
import withLSFiltersLogic from '../../../HOC/withLSFiltersLogic';



const LSFilters = ({filters, filterHandle, isLoadingData, isLoadingOutfits}) => (
    <div className="ls-filters">
        <div className="text-center">
            <strong>Filter by:</strong>
        </div>

        <Collapse>
            {filters.map(({choices, name: groupName, display_name, selected}) => (
                <Panel showArrow={false} key={groupName} header={display_name}>
                    <div className={cn('ls-filters__group', {'is-large': choices.length > 3})}>

                        {choices.map(({name: choiceName, color, icon}) => (
                            <Choice
                                key={choiceName}
                                label={choiceName}
                                id={choiceName}
                                name={choiceName}
                                onChange={filterHandle}
                                disabled={isLoadingData || isLoadingOutfits}
                                data-filter-group={groupName}
                                data-filter-choice={choiceName}
                                checked={selected.indexOf(choiceName) >= 0}
                                color={color}
                                icon={icon}
                            />
                        ))}

                    </div>
                </Panel>
            ))}
        </Collapse>
    </div>
);

function mapStateToProps({collection}) {
    return {
        isLoadingData: collection.isLoadingData,
        isLoadingOutfits: collection.isLoadingOutfits,
    };
}

export default compose(
    withLSFiltersLogic,
    connect(mapStateToProps)
)(LSFilters);
