import React from "react";
import Header from "../parts/header";

// Herbruikbare Modal Component
function Modal({ id, title, content }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Voorwaarden:</h5>
                            <ul style={{ textAlign: "left" }}>
                                {content.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sluiten</button>
                        </div>
                    </div>
                </div>
            </div>

    );
}

// Herbruikbare Card Component
function SubscriptionCard({ title, features, price, modalId, modalContent }) {
    return (
        <div className="col-4 mb-3">
            <div className="card text-center" style={{ marginLeft: 10, marginTop: 250 }}>
                <h5 className="card-type" alt={title} />
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p>
                        {features.map((feature, index) => (
                            <span key={index}>
                <i className="bi bi-check"></i>&nbsp;{feature}<br />
              </span>
                        ))}
                    </p>
                    <p className="card-text">{price.description}</p>
                    <a href="" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>Lees hier de voorwaarden</a>
                    <a href="/" className="btn btn-primary w-100">Kies</a>
                </div>
            </div>

            <Modal id={modalId} title={title} content={modalContent} />
        </div>
    );
}

// Hoofdcomponent
function Subscription() {
    const payAsYouGoFeatures = [
        "Maandelijks vast bedrag",
        "Direct korting op al je huurprijzen",
        "Perfect voor regelmatige huurders",
        "€14,95,- per maand"
    ];

    const prepaidFeatures = [
        "Kies je pakket aan huurdagen",
        "Eén keer vooraf betalen",
        "Geen verrassingen, maximale flexibiliteit",
        "vanaf €25 per maand"
    ];

    const payAsYouGoModalContent = [
        "Het maandbedrag van €14,95 is maandelijks verschuldigd en wordt automatisch verlengd totdat het abonnement wordt opgezegd.",
        "Korting van 10% op alle huurbedragen geldt alleen voor huurtransacties die zijn geboekt tijdens de actieve abonnementsperiode.",
        "De korting is niet van toepassing op speciale aanbiedingen, acties of kortingscodes.",
        "Abonnement kan op elk moment worden opgezegd. Betalingen voor de lopende maand worden niet gerestitueerd.",
        "Betalingen worden maandelijks gefactureerd via het gekozen betaalmiddel.",
        "Bij opzegging blijft het abonnement actief tot het einde van de huidige maand."
    ];

    const prepaidModalContent = [
        "Het bedrag voor de Prepaid Huurdagen Pas wordt vooraf betaald en de dagen kunnen binnen een jaar na aankoop worden gebruikt.",
        "Het aantal dagen dat is gekocht is niet overdraagbaar naar andere abonnementen of accounts.",
        "De prepaid dagen kunnen niet worden gerestitueerd, ongeacht het gebruik.",
        "Het abonnement is geldig voor 12 maanden vanaf de datum van aankoop.",
        "De korting voor grotere pakketten wordt toegepast op het totaal van de huurdagen.",
        "Ongebruikte dagen vervallen na 12 maanden, tenzij anders vermeld.",
        "Betalingen worden vooraf gefactureerd via het gekozen betaalmiddel."
    ];

    return (
        <>
            <Header />
            <div className="row pt-5" style={{backgroundColor: "gray", minHeight: "100vh"}}>
                <div className="col-2"></div>

                {/* Pay as you go Card */}
                <SubscriptionCard
                    title="Pay as you go"
                    features={payAsYouGoFeatures}
                    price={{
                        description: "Met de Pay-as-you-go Voordeelpas betaal je een vast maandelijks bedrag en ontvang je een aantrekkelijke procentuele korting op al je huurbedragen. Ideaal als je regelmatig sportmateriaal nodig hebt en wilt besparen zonder je vast te leggen."
                    }}
                    modalId="voorwaardenModal"
                    modalContent={payAsYouGoModalContent}
                />

                {/* Prepaid + Card */}
                <SubscriptionCard
                    title="Prepaid +"
                    features={prepaidFeatures}
                    price={{
                        description: "De Prepaid Huurdagen Pas biedt een zorgeloze ervaring: betaal vooraf voor een bundel huurdagen en gebruik ze wanneer het jou uitkomt. Geen maandelijkse kosten, maar wél zekerheid dat je altijd kunt huren wanneer nodig."
                    }}
                    modalId="voorwaardenModalPrepaid"
                    modalContent={prepaidModalContent}
                />

                <div className="col-2"></div>
            </div>
        </>
    );
}

export default Subscription;
