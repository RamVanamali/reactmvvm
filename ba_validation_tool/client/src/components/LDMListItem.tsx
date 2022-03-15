import React, { useState } from 'react';
import { observer } from 'mobx-react';
import LDMItemViewModel from '../viewmodels/LDMItemViewModel';

type LDMItemProps = {
    viewModel: LDMItemViewModel
}

export default observer(
    ({viewModel} : LDMItemProps) => {
        
        const [isEditing, setIsEditing] = useState(false);
        const [content, setContent] = useState(viewModel.sourcefield);

        // function onCheckboxChanged(e: React.FormEvent<HTMLInputElement>) {
        //     viewModel.setIsDone(e.currentTarget.checked);
        // }

        // function onInputChanged(e: React.FormEvent<HTMLInputElement>) {
        //     setContent(e.currentTarget.value);
        // }

        // function onInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        //     if (e.key === 'Enter') {
        //         update();   
        //     }
        // }

        // function update() {
        //     viewModel.updateContent(content);
        //     setIsEditing(false);
        // }

        return (
            <li>
                <span>SourceField: {viewModel.sourcefield}</span>
                <span>TargetField:  {viewModel.targetfield}</span>
                <span>Datatype: {viewModel.datatype}</span>
                
               
                
                {/* {viewModel.isAwaiting
                    ? null
                    : <input type="checkbox" checked={viewModel.isDone} onChange={onCheckboxChanged}/>}
                {viewModel.isAwaiting
                    ? <span>Loading...</span>
                    : isEditing
                        ? <input onChange={onInputChanged} onKeyUp={onInputKeyUp} value={content}/>
                        : <span onClick={() => setIsEditing(true)}>{content}</span>} */}
                {/* {isEditing
                    ? <button onClick={update}>Done</button>
                    : <button onClick={deleteItem}>Delete</button>} */}
            </li>
        );
    }
);