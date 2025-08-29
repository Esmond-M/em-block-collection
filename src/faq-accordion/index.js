import Edit from './edit';
import './style.scss';

const name = 'em-block-faq-accordion/em-block-faq-accordion';

wp.blocks.registerBlockType(name, {
    edit: Edit,
    save: () => null // Rendered in PHP
});
