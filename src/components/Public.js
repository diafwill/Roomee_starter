import { Link } from "react-router-dom"

const Public = () => {

    const content = (
        <section className="public">
            <header>
                <h1>Bienvenue  à Roomee !</h1>
            </header>
            <main>
                <p>Located in Beautiful Downtown Foo City, Repair Store provides a trained staff ready to meet your repair needs.</p>
                <p>&nbsp;</p>
                <address>
                    Gestion d'Hôtel <br />
                    555 Libre <br />
                    Paris, CA 12345<br />
                    <a href="tel:+33 568756708">(+33) 555-5555</a>
                </address>
            </main>
            <footer>
                <Link to="/login">Employyé Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public