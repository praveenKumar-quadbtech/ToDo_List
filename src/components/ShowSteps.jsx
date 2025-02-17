export const ShowSteps = ({ steps }) => {
    return (
        <div className="flex flex-col gap-2 px-1 justify-center">
            {steps?.map((step, idx) => {
                return (
                    <div key={idx} className="flex gap-4 items-center">
                        <p>{idx + 1}</p>
                        <input type="checkbox" name="" id="" />
                        <p>{step}</p>
                    </div>
                )
            })}
        </div>
    )
}
