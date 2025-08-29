// ...existing code...
import Edit from './edit';
import './style.scss';

wp.blocks.registerBlockType('em/new-block', {
  edit: Edit,
  save: () => <div>Save New Block</div>,
});
