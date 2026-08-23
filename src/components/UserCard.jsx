import UserSkeleton from "./UserSkeleton";

const UserCard = ({ isLoading = false, item }) => {
  const { photoUrl, about, firstName, lastName } = item;

  return isLoading ? (
    /* Skeleton Loading State */
    <UserSkeleton />
  ) : (
    /* Loaded Card State */
    <div className="card bg-base-100 w-96 shadow-sm justify-center bg-white/5">
      <figure>
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Shoes"
          className="object-cover object-top w-full h-[280px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline">Ignore</button>
          <button className="btn btn-secondary">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
