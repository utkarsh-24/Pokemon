import "../styles/PetCard.css";
const PetCard = ({ pet, handleClick }) => {
  const getTimeDifferenceInHours = (timestamp) => {
    const now = new Date();
    const lastFeedTime = new Date(timestamp);
    const timeDifferenceInMilliseconds = now - lastFeedTime;
    const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));

    return hours;
  };
  return (
    <div
      href=""
      className="pet__card"
      style={{
        filter: pet.healthStatus / 10 === 0 ? "grayscale(100%)" : "none",
        opacity: pet.healthStatus / 10 === 0 ? 1 : `${pet.healthStatus / 10}`,
      }}
      key={pet._id}
      onClick={() => handleClick(pet._id)}
    >
      <img src={pet.posterSrc} className="pet__card__image" alt="" />
      <div className="pet__card__overlay">
        <div className="pet__card__header">
          <svg className="pet__card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <img className="pet__card__thumb" src={pet.posterSrc} alt="" />
          <div className="pet__card__header-text">
            <h3 className="pet__card__title">{pet.name}</h3>
            <span className="pet__card__status">
              Feeded: {getTimeDifferenceInHours(pet.lastFeedTime)} hour ago
            </span>
            <br></br>
            <span className="pet__card__status">
              Health Status: {pet.healthStatus}
            </span>
          </div>
        </div>
        <p className="pet__card__description">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetCard;
