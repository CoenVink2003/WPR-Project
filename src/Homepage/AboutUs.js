import Header from "../parts/header";

function AboutUs () {
    return (
        <>
            <Header />
            <div className="row p-4">
                <div className="col-6">
                    <div className="card">
                        <h5 className="card-header">Over CarAndAll</h5>
                        <div className="p-3">
                            Wij bij CarAndAll proberen altijd de mooiste, snelste, meest blitze huurautos te verkrijgen voor jou! <div>
                            <br/>
                            <b>Particuliere klanten</b><br/>
                            Bij ons kunnen particuliere klanten voor weinig geld een mooie auto huren. Dat kan al voor 1
                            dag, maar voor een jaar is ook geen probleem!<br/><br/>
                            <br/>
                            <b>Zakelijke klanten</b><br/>
                            Bij ons kunnen zakelijke klanten ook voor weinig geld een mooie auto huren. Bij zakelijke klanten maken wij gebruik van een abonnementensysteem<br/><br/>
                            <br/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <h5 className="card-header">Waar je ons kan vinden</h5>
                        <div className="card-body">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.6949521112583!2d4.31910309198989!3d52.06707789733634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b6e175fe3619%3A0x9d1994a880751d7a!2sDe%20Haagse%20Hogeschool!5e0!3m2!1snl!2snl!4v1733749797597!5m2!1snl!2snl"
                                width="100%" height="450" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;