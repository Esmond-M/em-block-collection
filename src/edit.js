import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, IconButton } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');
    const faqs = attributes.faqs || [];

    const addFaq = () => {
        if (newQuestion && newAnswer) {
            setAttributes({ faqs: [...faqs, { question: newQuestion, answer: newAnswer }] });
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const startEdit = (idx) => {
        setEditIndex(idx);
        setEditQuestion(faqs[idx].question);
        setEditAnswer(faqs[idx].answer);
    };

    const saveEdit = () => {
        const updatedFaqs = faqs.map((faq, idx) =>
            idx === editIndex ? { question: editQuestion, answer: editAnswer } : faq
        );
        setAttributes({ faqs: updatedFaqs });
        setEditIndex(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    const deleteFaq = (idx) => {
        const updatedFaqs = faqs.filter((_, i) => i !== idx);
        setAttributes({ faqs: updatedFaqs });
        if (editIndex === idx) cancelEdit();
    };

    return (
        <>
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
                                <strong>{faq.question}</strong>
                                <div>{faq.answer}</div>
                                <div style={{ marginTop: '8px' }}>
                                    <Button isSecondary onClick={() => startEdit(idx)} style={{ marginRight: '8px' }}>Edit</Button>
                                    <Button isDestructive onClick={() => deleteFaq(idx)}>Delete</Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
