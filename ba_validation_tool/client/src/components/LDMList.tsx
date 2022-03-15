import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import LDMListViewModel from '../viewmodels/LDMListViewModel';
import LDMItem from './LDMListItem';

type LDMListProps = {
    viewModel: LDMListViewModel
}

export default observer(
    ({viewModel} : LDMListProps) => {

        let [newItemText, setNewItemText] = useState('');

        useEffect(() => {
            viewModel.fetchLDMItems();
        }, []);

        function onInputChanged(e: React.FormEvent<HTMLInputElement>) {
            setNewItemText(e.currentTarget.value)
        }

        // function onAddClicked() {
        //     viewModel.addTodoItem(newItemText)
        //         .then(() => setNewItemText(''));
        // }

        return (
            <div>
                <h1>Todo Items: {viewModel.LDMsCount}</h1>
                <ol>
                    {viewModel.LDMItems?.map(item => <LDMItem key={item.id} viewModel={item} />)}
                </ol>
                {/* <div>
                    <input type="text" value={newItemText} onChange={onInputChanged}/>
                    {viewModel.isAwaiting
                        ? <span>Loading...</span> 
                        : <button onClick={onAddClicked}>Add</button>}
                    {viewModel.didRequestFail
                        ? <span>{viewModel.failReason}</span> 
                        : null}
                </div> */}
            </div>
        );
    }
);