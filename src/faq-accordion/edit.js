// ...existing code...
// Block editor for EM FAQ Accordion
import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    // State for new FAQ input
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    // State for editing existing FAQ
    const [editIndex, setEditIndex] = useState(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    // Get current FAQs from block attributes
    const faqs = attributes.faqs || [];

    // Add a new FAQ item
    const addFaq = () => {
        if (newQuestion && newAnswer) {
            setAttributes({ faqs: [...faqs, { question: newQuestion, answer: newAnswer }] });
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    // Start editing an FAQ item
    const startEdit = (idx) => {
        setEditIndex(idx);
        setEditQuestion(faqs[idx].question);
        setEditAnswer(faqs[idx].answer);
    };

    // Save changes to an FAQ item
    const saveEdit = () => {
        const updatedFaqs = faqs.map((faq, idx) =>
            idx === editIndex ? { question: editQuestion, answer: editAnswer } : faq
        );
        setAttributes({ faqs: updatedFaqs });
        setEditIndex(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditIndex(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    // Delete an FAQ item
    const deleteFaq = (idx) => {
        const updatedFaqs = faqs.filter((_, i) => i !== idx);
        setAttributes({ faqs: updatedFaqs });
        if (editIndex === idx) cancelEdit();
    };

    // Move an FAQ item up or down
    const moveFaq = (from, to) => {
        if (to < 0 || to >= faqs.length) return;
        const updatedFaqs = [...faqs];
        const [moved] = updatedFaqs.splice(from, 1);
        updatedFaqs.splice(to, 0, moved);
        setAttributes({ faqs: updatedFaqs });
    };

    return (
        <>
            {/* Inspector controls for adding new FAQ */}
            <InspectorControls>
                <PanelBody title="Add FAQ">
                    <TextControl
                        label="Question"
                        value={newQuestion}
                        onChange={setNewQuestion}
                    />
                    <TextControl
                        label="Answer"
                        value={newAnswer}
                        onChange={setNewAnswer}
                    />
                    <Button isPrimary onClick={addFaq}>Add FAQ</Button>
                </PanelBody>
            </InspectorControls>
            <div className="em-faq-accordion">
                {faqs.length === 0 && <p>No FAQs added yet.</p>}
                {faqs.map((faq, idx) => (
                    <div className="faq-item" key={idx}>
                        {editIndex === idx ? (
                            <>
                                {/* Edit mode for FAQ */}
                                <TextControl
                                    label="Edit Question"
                                    value={editQuestion}
                                    onChange={setEditQuestion}
                                />
                                <TextControl
                                    label="Edit Answer"
                                    value={editAnswer}
                                    onChange={setEditAnswer}
                                />
                                <Button isPrimary onClick={saveEdit} style={{ marginRight: '8px' }}>Save</Button>
                                <Button onClick={cancelEdit}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                {/* FAQ question button for styling and accessibility */}
                                <button
                                    className="faq-question"
                                    type="button"
                                    tabIndex={0}
                                    aria-expanded="false"
                                    style={{ all: 'unset', display: 'flex', alignItems: 'center', width: '100%' }}
                                >
                                    {faq.question}
                                </button>
                                <div>{faq.answer}</div>
                                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                                    <Button isSecondary onClick={() => startEdit(idx)} style={{ marginRight: '8px' }}>Edit</Button>
                                    <Button isDestructive onClick={() => deleteFaq(idx)} style={{ marginRight: '8px' }}>Delete</Button>
                                    <Button
                                        isSecondary
                                        disabled={idx === 0}
                                        onClick={() => moveFaq(idx, idx - 1)}
                                        style={{ marginRight: '4px' }}
                                    >↑</Button>
                                    <Button
                                        isSecondary
                                        disabled={idx === faqs.length - 1}
                                        onClick={() => moveFaq(idx, idx + 1)}
                                    >↓</Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}