import ReactMarkdown from 'react-markdown';

export default function ChefData(props) {
    return(
        <section ref={props.ref}>
            <ReactMarkdown>{props.showrecipedata}</ReactMarkdown>
        </section>
    )
}
